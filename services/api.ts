import type { ApiResponse } from '../types';

const API_BASE_URL = 'https://veo-licious-gems-backend-t5666p4y5q-uc.a.run.app';

function formatJobResult(job: any): ApiResponse {
  return {
    business_name: job.business_name || "Generated Content",
    content_calendar: job.posts.map((post: any) => ({
      day: post.day,
      date: new Date(Date.now() + (post.day - 1) * 86400000).toISOString().split('T')[0],
      platform: post.platform,
      caption: post.caption,
      images: post.image_segments.map((img: any) => img.uri),
      video_url: post.video_segments[0]?.uri || '',
      video_duration: post.total_duration_seconds || 15
    }))
  };
}

async function pollJobStatus(jobId: string, onProgress: (progress: number, message: string) => void): Promise<ApiResponse> {
  const maxAttempts = 120;
  const interval = 5000;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status/${jobId}`);
      if (!response.ok) {
        console.error(`Status check failed for job ${jobId}: ${response.status}`);
        await new Promise(resolve => setTimeout(resolve, interval));
        continue;
      }
      
      const job = await response.json();

      onProgress(job.progress || 0, job.current_step || 'Starting job...');

      if (job.status === 'completed') {
        return formatJobResult(job);
      }

      if (job.status === 'failed') {
        throw new Error(job.error || 'Generation job failed');
      }

      await new Promise(resolve => setTimeout(resolve, interval));
    } catch (error) {
       console.error("Polling error:", error);
       await new Promise(resolve => setTimeout(resolve, interval));
    }
  }

  throw new Error('Generation timed out. Please try again.');
}

export const generateContent = async (
  websiteUrl: string, 
  address: string, 
  numDays: number,
  onProgress: (progress: number, message: string) => void
): Promise<ApiResponse> => {
  const startResponse = await fetch(`${API_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      business_input: {
        website_url: websiteUrl,
        business_address: address,
        days: Math.min(numDays || 7, 7)
      }
    })
  });

  if (!startResponse.ok) {
    const errorText = await startResponse.text();
    throw new Error(`Failed to start generation job: ${startResponse.status} - ${errorText}`);
  }

  const { job_id } = await startResponse.json();
  if (!job_id) {
    throw new Error('Failed to get a job ID from the server.');
  }

  return await pollJobStatus(job_id, onProgress);
};