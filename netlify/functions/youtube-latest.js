exports.handler = async function () {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  console.log("API_KEY:", API_KEY);
  console.log("channelId:", channelId);

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key manquante" }),
    };
  }
  if (!channelId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Paramètre channelId manquant" }),
    };
  }

  try {
    // Récupérer la dernière vidéo
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=1&type=video`,
    );
    if (!searchRes.ok)
      throw new Error("Erreur lors de la récupération des vidéos");
    const searchData = await searchRes.json();

    if (!searchData.items || searchData.items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Aucune vidéo trouvée" }),
      };
    }

    const video = searchData.items[0];
    const videoId = video.id.videoId;

    // Récupérer les statistiques de la vidéo
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics,contentDetails`,
    );
    const statsData = await statsRes.json();
    const stats = statsData.items?.[0];

    const videoData = {
      id: videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail:
        video.snippet.thumbnails.maxres?.url ||
        video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
      viewCount: stats?.statistics?.viewCount,
      duration: stats?.contentDetails?.duration,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(videoData),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors du chargement de la vidéo",
        details: err.message,
      }),
    };
  }
};
