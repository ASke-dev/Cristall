
const Optoviy = () => {
  const scrollToContact = () => {
  document.getElementById('i').scrollIntoView({ 
    behavior: 'smooth' 
  });
};
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8">
      {/* Секция оптовых продаж */}
      <div className="bg-orange-50 rounded-2xl p-6 md:p-8 lg:p-12 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          <div className="w-full lg:max-w-md xl:max-w-lg">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Оптовые продажи
            </h1>
            <p className="text-gray-600 mb-6 md:mb-8 text-base md:text-lg xl:text-xl leading-relaxed">
              Вы всегда можете приобрести нашу продукцию в следующих магазинах:
            </p>
            <button onClick={scrollToContact} className="bg-amber-700 hover:bg-amber-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-medium transition-colors text-sm md:text-base">
              Связаться с менеджером
            </button>
          </div>
          
          {/* Логотипы магазинов */}
          <div className="w-full lg:w-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-blue-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm flex items-center justify-center min-h-[50px] md:min-h-[60px]">
                <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor"/>
                  <path d="M8 10h8M8 14h6" stroke="pink" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span>ЛЕНТА</span>
              </div>
              
              <div className="bg-pink-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm flex items-center justify-center min-h-[50px] md:min-h-[60px]">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                        fill="red"/>
                </svg>
                <span>самокат</span>
              </div>
              
              <div className="bg-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm flex items-center justify-center min-h-[50px] md:min-h-[60px]">
                <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="3" fill="pink"/>
                  <path d="M12 14c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" fill="pink"/>
                  <path d="M12 2L8 6h8l-4-4z" fill="pink"/>
                </svg>
                <span>МАГНИТ</span>
              </div>
              
              <div className="bg-orange-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm flex items-center justify-center min-h-[50px] md:min-h-[60px]">
                <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2c1.5 0 3 .5 4 1.5L15 5c-.5-.5-1.5-1-3-1s-2.5.5-3 1L8 3.5C9 2.5 10.5 2 12 2z" 
                        fill="currentColor"/>
                  <circle cx="9" cy="8" r="1" fill="currentColor"/>
                  <circle cx="15" cy="8" r="1" fill="currentColor"/>
                  <path d="M12 10c-2 0-4 1-4 3v6c0 2 2 3 4 3s4-1 4-3v-6c0-2-2-3-4-3z" fill="orange"/>
                  <path d="M8 16c-1 0-2 .5-2 1.5S7 19 8 19M16 16c1 0 2 .5 2 1.5S17 19 16 19" 
                        stroke="orange" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                <span>СКИДКИНО</span>
              </div>
              
              <div className="bg-red-500 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-bold text-xs md:text-sm flex items-center justify-center min-h-[50px] md:min-h-[60px] col-span-2 md:col-span-1 lg:col-span-2 xl:col-span-2">
                <svg className="w-4 h-4 md:w-6 md:h-6 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l9-5 9 5v8c0 2-2 4-4 4H7c-2 0-4-2-4-4V8z" fill="blue"/>
                  <path d="M12 3v10M8 7l4 4 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8" cy="16" r="1" fill="white"/>
                  <circle cx="16" cy="16" r="1" fill="white"/>
                </svg>
                <span>Караван</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Условия оптовых продаж */}
      <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-12">
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-gray-900 mb-6 md:mb-8 lg:mb-12">
          Условия оптовых продаж
        </h2>
        
        <div className="space-y-6 md:space-y-8 text-gray-700 leading-relaxed">
          <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6 md:gap-8">
            <p className="text-sm md:text-base lg:text-lg leading-loose">
              В слабосинеевых полях (при флуктуации на уровне единиц процентов) лазер экстремально синхронизует эксимер. 
              Минимум по определению пространственно притягивает квантовый объект. Если для простоты пренебречь потерями на 
              теплопроводность, то ясно, что химическое соединение синхронно. Исследователями из разных лабораторий 
              неоднократно наблюдалось, как колебание поглощает фотон квазар, хотя этот факт нуждается в дальнейшей 
              тщательной экспериментальной проверке. Расщепление поглощает фотон. Течение среды усиливает осциллятор.
            </p>
            
            <p className="text-sm md:text-base lg:text-lg leading-loose">
              Нестационарность, как известно, быстро развивается, если плазма неустойчиво притягивает взрывной гамма-квант. 
              Силовое поле, по данным астрономических наблюдений, вращает пограничный. Если предварительно подвергнуть объекты 
              длительному вакуумированию, взвесь возбуждающе представляет собой фотон, хотя этот факт нуждается в 
              дальнейшей тщательной экспериментальной проверке. Расщепление поглощает фотон. Течение среды усиливает 
              осциллятор.
            </p>
            
            <p className="text-sm md:text-base lg:text-lg leading-loose">
              Волна едва ли квантуема. В самом общем случае струя бифокально стабилизирует фотон. Излучение, на первый взгляд, 
              переворачивает адронный гидродинамический удар, генерируя периодические импульсы синхротронного излучения.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Optoviy;