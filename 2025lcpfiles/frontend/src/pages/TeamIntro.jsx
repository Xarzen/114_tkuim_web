import { Link } from 'react-router-dom';

const TeamIntro = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* 主標題區 */}
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          T1 戰隊
        </h1>
        <p className="text-3xl text-red-500 font-semibold mb-2">
          英雄聯盟傳奇戰隊
        </p>
        <p className="text-2xl text-gray-300">
          六冠王者
        </p>
      </div>

      {/* 戰隊介紹 */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-red-900">
          <h2 className="text-3xl font-bold text-red-400 mb-6 drop-shadow-lg">
            關於 T1
          </h2>
          <div className="text-gray-300 space-y-4 leading-relaxed text-lg">
            <p>
              T1（原 SK Telecom T1）是韓國最具傳奇色彩的電子競技戰隊，在《英雄聯盟》領域擁有無與倫比的統治力。
              自成立以來，T1 已經六次奪得世界冠軍，是英雄聯盟史上最成功的戰隊。
            </p>
            <p>
              戰隊以其嚴格的訓練制度、完善的戰術體系和培養頂尖選手的能力而聞名。
              從傳奇中路選手 Faker 到新生代天才，T1 持續為全球粉絲帶來精彩的比賽和難忘的時刻。
            </p>
            <p>
              T1 不僅是一支戰隊，更是電子競技精神的象徵，代表著追求卓越、永不放棄的競技態度。
              紅黑配色成為了勝利與榮耀的標誌。
            </p>
          </div>
        </div>
      </div>

      {/* 主要成就 */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border border-red-900">
          <h2 className="text-3xl font-bold text-red-400 mb-6 drop-shadow-lg">
            主要成就
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-red-800">
              <h3 className="text-xl font-bold text-white mb-2">世界冠軍</h3>
              <p className="text-gray-400">2013, 2015, 2016, 2023, 2024, 2025</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-red-800">
              <h3 className="text-xl font-bold text-white mb-2">LCK 冠軍</h3>
              <p className="text-gray-400">多次獲得韓國聯賽冠軍</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-red-800">
              <h3 className="text-xl font-bold text-white mb-2">MSI 冠軍</h3>
              <p className="text-gray-400">季中邀請賽冠軍得主</p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg border border-red-800">
              <h3 className="text-xl font-bold text-white mb-2">電競傳奇</h3>
              <p className="text-gray-400">培養眾多世界級選手</p>
            </div>
          </div>
        </div>
      </div>

      {/* 快速導航 */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow-lg">
          探索 T1 團隊
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/players"
            className="group bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-2xl p-8 hover:from-red-500 hover:to-red-700 transition-all duration-300 transform hover:scale-105 border-2 border-red-400"
          >
            <h3 className="text-2xl font-bold text-white mb-3 text-center">選手陣容</h3>
            <p className="text-red-100 text-center">
              查看 T1 所有選手的詳細資料與成就
            </p>
            <div className="text-center mt-4 text-white font-semibold group-hover:translate-x-2 transition-transform">
              進入選手列表 →
            </div>
          </Link>

          <Link
            to="/coaches"
            className="group bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-2xl p-8 hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 border-2 border-red-400"
          >
            <h3 className="text-2xl font-bold text-white mb-3 text-center">教練團隊</h3>
            <p className="text-gray-300 text-center">
              了解打造冠軍隊伍的專業教練團
            </p>
            <div className="text-center mt-4 text-white font-semibold group-hover:translate-x-2 transition-transform">
              進入教練列表 →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamIntro;
