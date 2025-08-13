exports.handler = async function () {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

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
    // Requêtes pour récupérer la dernière vidéo et vérifier s'il y a un live en cours.
    const latestVideoUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=1&type=video`;
    const liveCheckUrl = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet&eventType=live&type=video&maxResults=1`;

    const [searchRes, liveRes] = await Promise.all([
      fetch(latestVideoUrl),
      fetch(liveCheckUrl),
    ]);

    if (!searchRes.ok) throw new Error("Erreur lors de la récupération des vidéos (latest)");
    if (!liveRes.ok) throw new Error("Erreur lors de la vérification du live");

    const searchData = await searchRes.json();
    const liveDataRaw = await liveRes.json();

    // --- Préparer liveData ---
    let liveData = { isLive: false, url: false };
    if (liveDataRaw.items && liveDataRaw.items.length > 0) {
      const liveVideo = liveDataRaw.items[0];
      const liveVideoId = liveVideo.id?.videoId;
      if (liveVideoId) {
        liveData = {
          isLive: true,
          url: `https://www.youtube.com/watch?v=${liveVideoId}`,
        };
      }
    }

    // --- Si aucune vidéo trouvée, on renvoie une erreur comme avant (mais on pourrait renvoyer quand même liveData si tu veux) ---
    if (!searchData.items || searchData.items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: "Aucune vidéo trouvée",
          liveData,
        }),
      };
    }

    const video = searchData.items[0];
    const videoId = video.id.videoId;

    // Récupérer les statistiques et contentDetails de la vidéo
    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoId}&part=statistics,contentDetails`
    );
    if (!statsRes.ok) {
      // On ne plante pas complètement : on renvoie la vidéo sans stats si l'API stats échoue
      console.warn("Impossible de récupérer les stats de la vidéo :", await statsRes.text());
    }
    const statsData = await statsRes.json();
    const stats = statsData.items?.[0];

    const videoData = {
      id: videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail:
        video.snippet.thumbnails?.maxres?.url ||
        video.snippet.thumbnails?.high?.url ||
        video.snippet.thumbnails?.default?.url ||
        null,
      publishedAt: video.snippet.publishedAt,
      viewCount: stats?.statistics?.viewCount ?? null,
      duration: stats?.contentDetails?.duration ?? null,
    };

    // Objet final contenant videoData et liveData
    const responsePayload = {
      videoData,
      liveData,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(responsePayload),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erreur lors du chargement de la vidéo / vérification du live",
        details: err.message,
      }),
    };
  }
};
