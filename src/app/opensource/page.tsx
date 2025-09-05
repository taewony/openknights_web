import React from 'react';
import Arrow from '@/components/Arrow';
import Section from '@/components/Section';
import TimelineItem from '@/components/TimelineItem';
import PrizeCard from '@/components/PrizeCard';

const Hero = () => {
    const heroBgStyle = {
        backgroundImage: `url(/image/join_the_team.png)`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f94f09',
    };

    return (
        <div className="relative text-white overflow-hidden w-full h-[60vh]" style={heroBgStyle}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            {/* Text Container */}
            <div className="absolute z-10 top-1/2 left-1/4 -translate-y-1/2 text-left">
                <h1 className="font-noto-serif-kr text-5xl md:text-7xl font-bold leading-tight">
                    오픈소스
                </h1>
                <p className="font-noto-serif-kr text-4xl md:text-6xl mt-2">
                    (25년 하반기)
                </p>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <div className="bg-gray-50 antialiased">
            

            <main>
                <Hero />

{/* 1. 기존 '대회 소개' 섹션 (심사위원 정보 제거) */}
<Section id="about" title="대회 소개">
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-600 leading-relaxed">
        우송대학교 SW중심대학사업단에서 주최하는 '오픈소스 SW 활용 경진대회'는 학생들의 창의적인 아이디어와 SW 개발 능력을 발휘할 수 있는 기회의 장입니다. 오픈소스 프로젝트에 기여하거나, 오픈소스를 활용하여 새로운 가치를 창출하는 프로젝트를 통해 미래의 SW 전문가로 성장하세요!
    </p>
</Section>

{/* 2. 새로 추가된 '심사위원 소개' 섹션 */}
<Section id="judge" title="심사위원 소개" className="bg-gray-100">
    <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-gray-700">
            예선 심사위원: 이창복 교수님, 김영호 교수님, 조석형 교수님
        </p>
        <p className="text-lg text-gray-700 mt-2">
            본선 심사위원: ...
        </p>
    </div>
</Section>

{/* 1. 기존 '대회 소개' 섹션 (심사위원 정보 제거) */}
<Section id="pre-contest" title="예선 결과">
    <p className="max-w-3xl mx-auto text-center text-lg text-gray-600 leading-relaxed">
        우송대학교 SW중심대학사업단에서 주최하는 '오픈소스 SW 활용 경진대회'는 학생들의 창의적인 아이디어와 SW 개발 능력을 발휘할 수 있는 기회의 장입니다. 오픈소스 프로젝트에 기여하거나, 오픈소스를 활용하여 새로운 가치를 창출하는 프로젝트를 통해 미래의 SW 전문가로 성장하세요!
    </p>
</Section>

                <Section id="schedule" title="대회 일정" className="bg-gray-100">
                    <div className="max-w-2xl mx-auto">
                        <TimelineItem
                            date="2025. 10. 27 - 11. 23"
                            title="예선 접수"
                            description="온라인을 통해 참가 신청서 및 UI 화면 예시를 제출합니다."
                        />
                        <TimelineItem
                            date="2025. 11. 24(월)"
                            title="예선 평가"
                            description="에선 심사을 통해 본선에 나갈 12팀을 선정합니다."
                        />
						<TimelineItem
                            date="2025. 11. 25 - 12. 3"
                            title="개발 및 본선 발표 준비"
                            description="프로젝트를 개발하고, 발표자료 ppt 및 데모 시연 영상 등을 제출합니다."
                        />
                        <TimelineItem
                            date="2025. 12. 4(목)"
                            title="본선 및 시상"
                            description="개발 결과물을 발표하고, 우수 팀을 선정하여 시상합니다."
                            isLast={true}
                        />
                    </div>
                </Section>

<Section id="prizes">
  {/* 전체를 좌우 2단으로 나누는 메인 그리드 */}
  <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
    
    {/* 왼쪽: 창의성 부문 */}
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">창의성 부문 시상 (시장성, 기술 완성도)</h2>
      <div className="w-full flex flex-col items-center gap-4"> {/* gap-4로 카드 간격 조정 */}
        <PrizeCard rank="자립상" award="30만원" teamCount="1팀" className="py-2 px-4 text-sm" /> {/* py-2 px-4 text-sm 추가 */}
        <div className="grid grid-cols-2 gap-4 w-full"> {/* 단정상, 독행상을 위한 2열 그리드 */}
          <PrizeCard rank="단정상" award="20만원" teamCount="2팀" className="py-2 px-4 text-sm" />
          <PrizeCard rank="독행상" award="10만원" teamCount="3팀" className="py-2 px-4 text-sm" />
        </div>
      </div>
    </div>

    {/* 오른쪽: 실용성 부문 (동일하게 적용) */}
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">실용성 부문 시상 (독창성, 학습 기여도)</h2>
      <div className="w-full flex flex-col items-center gap-4">
        <PrizeCard rank="자립상" award="30만원" teamCount="1팀" className="py-2 px-4 text-sm" />
        <div className="grid grid-cols-2 gap-4 w-full">
          <PrizeCard rank="단정상" award="20만원" teamCount="2팀" className="py-2 px-4 text-sm" />
          <PrizeCard rank="독행상" award="10만원" teamCount="3팀" className="py-2 px-4 text-sm" />
        </div>
      </div>
    </div>

  </div>
</Section>
                
                <Section id="apply" title="지금 바로 도전하세요!" className="bg-[#3f4fde]">
                     <div className="text-center">
                        <p className="max-w-2xl mx-auto text-lg text-white mb-8">
                            당신의 아이디어가 세상을 바꿀 수 있습니다. 지금 바로 지원하여 잠재력을 펼쳐보세요!
                        </p>
                        <a 
                            href="#" 
                            className="bg-[#f94f09] text-white font-black text-xl py-4 px-10 rounded-xl inline-block transform hover:scale-110 transition-transform duration-300 shadow-lg"
                        >
                            대회 지원하기
                        </a>
                    </div>
                </Section>
            </main>
            
            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-6 md:px-8 text-center">
                    <p>&copy; 2025 Woosong University. All rights reserved.</p>
                    <p className="mt-2 text-sm text-gray-400">우송대학교 SW중심대학사업단</p>
                </div>
            </footer>
        </div>
    );
};

export default App;