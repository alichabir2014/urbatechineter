import { useState, useEffect, useRef } from "react";
import {
  Radio,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Clock,
  Calendar,
  Headphones,
} from "lucide-react";
import { podcastEpisodes } from "../data/siteData";

export default function Podcast() {
  const [playing, setPlaying] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing !== null) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setPlaying(null);
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  const togglePlay = (episode: number) => {
    if (playing === episode) {
      setPlaying(null);
    } else {
      setProgress(0);
      setPlaying(episode);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm mb-4">
            <Radio size={16} />
            Radio & Podcast
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            URBA TECH Radio
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Tune in to discussions on engineering innovation, industry trends,
            and insights from leading professionals.
          </p>
        </div>

        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img
            src="/images/podcast.jpg"
            alt="URBA TECH Radio studio"
            className="w-full h-64 md:h-80 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/1200x400/1e293b/f59e0b/png?text=URBA+TECH+Radio";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-slate-900/40" />
          <div className="absolute inset-0 flex items-center px-8 md:px-16">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center animate-pulse">
                  <Headphones size={24} className="text-slate-900" />
                </div>
                <div>
                  <div className="text-amber-400 font-bold text-lg">
                    LIVE NOW
                  </div>
                  <div className="text-gray-400 text-sm">URBA TECH Radio</div>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Engineering Talk Show
              </h3>
              <p className="text-gray-300 mb-6">
                Weekly episodes featuring engineering leaders discussing the
                latest in infrastructure, technology, and sustainable
                development.
              </p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors">
                  <Radio size={18} />
                  Listen Live
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20">
                  <Calendar size={18} />
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-8">Latest Episodes</h3>

        <div className="space-y-4">
          {podcastEpisodes.map((ep) => (
            <div
              key={ep.episode}
              className={`bg-slate-800 rounded-xl p-6 border transition-all duration-300 ${
                playing === ep.episode
                  ? "border-amber-500/50 shadow-lg shadow-amber-500/10"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <button
                  onClick={() => togglePlay(ep.episode)}
                  className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 hover:bg-amber-400 transition-colors shrink-0"
                >
                  {playing === ep.episode ? (
                    <Pause size={24} />
                  ) : (
                    <Play size={24} className="ml-1" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-amber-400 text-sm font-medium">
                      EP {ep.episode}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock size={12} /> {ep.duration}
                    </span>
                    <span className="text-gray-500 text-sm">{ep.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {ep.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-1">
                    Guest:{" "}
                    <span className="text-amber-400">{ep.guest}</span>
                  </p>
                  <p className="text-gray-500 text-sm hidden md:block">
                    {ep.description}
                  </p>

                  {playing === ep.episode && (
                    <div className="mt-3">
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div
                          className="bg-amber-500 h-1.5 rounded-full transition-all duration-100"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-gray-500 text-xs">
                          {Math.floor(
                            (progress / 100) * parseInt(ep.duration)
                          )}
                          :00
                        </span>
                        <div className="flex items-center gap-3">
                          <SkipBack
                            size={16}
                            className="text-gray-400 hover:text-white cursor-pointer"
                          />
                          <SkipForward
                            size={16}
                            className="text-gray-400 hover:text-white cursor-pointer"
                          />
                          <Volume2
                            size={16}
                            className="text-gray-400 hover:text-white cursor-pointer"
                          />
                        </div>
                        <span className="text-gray-500 text-xs">
                          {ep.duration}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Radio size={40} className="text-amber-400" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Subscribe to URBA TECH Radio
              </h3>
              <p className="text-gray-400">
                Never miss an episode. Subscribe on your favorite podcast
                platform and stay updated with the latest in engineering.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-colors text-sm">
                Apple Podcasts
              </button>
              <button className="px-5 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-sm">
                Spotify
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
