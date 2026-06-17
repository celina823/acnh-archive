const artNames = [
  "academic painting",
  "amazing painting",
  "ancient statue",
  "basic painting",
  "beautiful statue",
  "calm painting",
  "common painting",
  "detailed painting",
  "dynamic painting",
  "familiar statue",
  "famous painting",
  "flowery painting",
  "gallant statue",
  "glowing painting",
  "graceful painting",
  "great statue",
  "informative statue",
  "jolly painting",
  "moody painting",
  "motherly statue",
  "moving painting",
  "mysterious painting",
  "mystic statue",
  "nice painting",
  "perfect painting",
  "proper painting",
  "quaint painting",
  "robust statue",
  "rock-head statue",
  "scary painting",
  "scenic painting",
  "serene painting",
  "sinking painting",
  "solemn painting",
  "tremendous statue",
  "twinkling painting",
  "valiant statue",
  "warm painting",
  "warrior statue",
  "wild painting left half",
  "wild painting right half",
  "wistful painting",
  "worthy painting",
] as const;

type ArtName = (typeof artNames)[number];

export const artOriginalTitleKoMap: Record<ArtName, string> = {
  "academic painting": "인체 비례도",
  "amazing painting": "야경",
  "ancient statue": "차광기토우",
  "basic painting": "파란 옷을 입은 소년",
  "beautiful statue": "밀로의 비너스",
  "calm painting": "그랑드자트 섬의 일요일 오후",
  "common painting": "이삭 줍는 여인들",
  "detailed painting": "자양화 쌍계도",
  "dynamic painting": "후가쿠 36경 중 가나가와 해변 높은 파도 아래",
  "familiar statue": "생각하는 사람",
  "famous painting": "모나리자",
  "flowery painting": "해바라기",
  "gallant statue": "다비드상",
  "glowing painting": "전함 테메레르",
  "graceful painting": "뒤돌아보는 미인",
  "great statue": "카메하메하 대왕 동상",
  "informative statue": "로제타 스톤",
  "jolly painting": "여름",
  "moody painting": "씨 뿌리는 사람",
  "motherly statue": "카피톨리나 늑대상",
  "moving painting": "비너스의 탄생",
  "mysterious painting": "죽음의 섬",
  "mystic statue": "네페르티티 흉상",
  "nice painting": "피리 부는 소년",
  "perfect painting": "사과와 오렌지",
  "proper painting": "폴리베르제르 바",
  "quaint painting": "우유 따르는 하녀",
  "robust statue": "원반 던지는 사람",
  "rock-head statue": "거대 두상",
  "scary painting": "3대 오타니 오니지의 얏코에도베",
  "scenic painting": "눈 속의 사냥꾼",
  "serene painting": "담비를 안고 있는 여인",
  "sinking painting": "오필리아",
  "solemn painting": "라스메니나스",
  "tremendous statue": "후모무정",
  "twinkling painting": "별이 빛나는 밤",
  "valiant statue": "사모트라케의 니케",
  "warm painting": "옷을 입은 마하",
  "warrior statue": "병마용",
  "wild painting left half": "풍신뇌신도 병풍(뇌신)",
  "wild painting right half": "풍신뇌신도 병풍(풍신)",
  "wistful painting": "진주 귀고리를 한 소녀",
  "worthy painting": "민중을 이끄는 자유의 여신",
};

export const artAuthorKoMap: Record<ArtName, string> = {
  "academic painting": "레오나르도 다 빈치",
  "amazing painting": "렘브란트 반 레인",
  "ancient statue": "작자 미상",
  "basic painting": "토마스 게인즈버러",
  "beautiful statue": "작자 미상",
  "calm painting": "조르주 쇠라",
  "common painting": "장 프랑수아 밀레",
  "detailed painting": "이토 쟈쿠츄",
  "dynamic painting": "가쓰시카 호쿠사이",
  "familiar statue": "오귀스트 로댕",
  "famous painting": "레오나르도 다 빈치",
  "flowery painting": "빈센트 반 고흐",
  "gallant statue": "미켈란젤로 부오나로티",
  "glowing painting": "조셉 말로드 윌리엄 터너",
  "graceful painting": "히시카와 모로노부",
  "great statue": "토머스 R 굴드",
  "informative statue": "작자 미상",
  "jolly painting": "주세페 아르침볼도",
  "moody painting": "장 프랑수아 밀레",
  "motherly statue": "작자 미상",
  "moving painting": "산드로 보티첼리",
  "mysterious painting": "아놀드 뵈클린",
  "mystic statue": "투트메스",
  "nice painting": "에두아르 마네",
  "perfect painting": "폴 세잔",
  "proper painting": "에두아르 마네",
  "quaint painting": "요하네스 페르메이르",
  "robust statue": "작자 미상",
  "rock-head statue": "작자 미상",
  "scary painting": "도슈사이 샤라쿠",
  "scenic painting": "피터르 브뤼헐",
  "serene painting": "레오나르도 다 빈치",
  "sinking painting": "존 에버렛 밀레이",
  "solemn painting": "디에고 벨라스케스",
  "tremendous statue": "작자 미상",
  "twinkling painting": "빈센트 반 고흐",
  "valiant statue": "작자 미상",
  "warm painting": "프란시스코 데 고야",
  "warrior statue": "작자 미상",
  "wild painting left half": "다와라야 소타쓰",
  "wild painting right half": "다와라야 소타쓰",
  "wistful painting": "요하네스 페르메이르",
  "worthy painting": "외젠 들라크루아",
};

export const artStyleKoMap: Record<ArtName, string> = {
  "academic painting": "펜과 잉크·종이",
  "amazing painting": "유채·캔버스",
  "ancient statue": "설구이",
  "basic painting": "유채·캔버스",
  "beautiful statue": "대리석",
  "calm painting": "유채·캔버스",
  "common painting": "유채·캔버스",
  "detailed painting": "견본 착색",
  "dynamic painting": "목판화",
  "familiar statue": "청동",
  "famous painting": "유채·패널",
  "flowery painting": "유채·캔버스",
  "gallant statue": "대리석",
  "glowing painting": "유채·캔버스",
  "graceful painting": "견본 착색",
  "great statue": "청동",
  "informative statue": "화강 섬록암",
  "jolly painting": "유채·캔버스",
  "moody painting": "유채·캔버스",
  "motherly statue": "청동",
  "moving painting": "템페라·캔버스",
  "mysterious painting": "유채·캔버스",
  "mystic statue": "석회암",
  "nice painting": "유채·캔버스",
  "perfect painting": "유채·캔버스",
  "proper painting": "유채·캔버스",
  "quaint painting": "유채·캔버스",
  "robust statue": "대리석",
  "rock-head statue": "현무암, 안산암",
  "scary painting": "목판화",
  "scenic painting": "유채·패널",
  "serene painting": "유채·패널",
  "sinking painting": "유채·캔버스",
  "solemn painting": "유채·캔버스",
  "tremendous statue": "청동",
  "twinkling painting": "유채·캔버스",
  "valiant statue": "대리석",
  "warm painting": "유채·캔버스",
  "warrior statue": "도제",
  "wild painting left half": "금지 설채",
  "wild painting right half": "금지 설채",
  "wistful painting": "유채·캔버스",
  "worthy painting": "유채·캔버스",
};

export const artDescriptionKoMap: Record<ArtName, string> = {
  "academic painting":
    "기원전 1세기의 건축가, 비트루비우스의 저서 '건축 10서'를 바탕으로, 이상적인 인체의 비율을 시각화한 드로잉.",
  "amazing painting":
    "17세기의 네덜란드 화가 렘브란트가 시민 경비대의 모습을 그린 최고의 걸작. 당시의 초상화는 부동자세가 보통이었으나 당장이라도 움직일 듯한 포즈나 빛과 그림자의 절묘한 활용이 드라마틱하게 그려졌다. 오랫동안 밤의 풍경으로 알려져 있었으나 실은 그림을 보호하는 니스가 검게 변했을 뿐이며, 실은 낮이었다는 사실이 복원을 통해 밝혀졌다.",
  "ancient statue":
    "흙을 빚고 그대로 구워 만든 조몬 시대의 인형. 신비로운 느낌을 자아낸다. 크고 동그란 눈매가 빛을 차단하는 고글과 닮았다고 하여 '차광기'토우라고 불린다.",
  "basic painting":
    "게인즈버러는 전통적인 초상화의 기법에 반한 혁명적인 색의 사용으로 많은 초상화 작품을 남겼다. '파란 옷을 입은 소년'도 그중에 하나. '초상화는 돈을 위해, 풍경화는 즐거움을 위해 그린다'고 말한 그의 초상화는, 아이러니하게도 근대 영국 미술에 지대한 영향을 끼쳤다.",
  "beautiful statue":
    "밀로 섬에서 발견된 사랑과 미의 여신 비너스의 조각. 원래는 어떤 포즈였을지 보는 이의 상상력을 자극한다.",
  "calm painting":
    "신인상파의 창시자인 쇠라가 물감을 섞지 않고도 선명하게 색을 표현하는 기법을 발명, 점만 사용해서 섬세하게 그린 작품. 프랑스 센강에 있는 섬에서 휴일을 즐기는 사람들의 광경을 구체적이면서도 섬세하게 그려낸 점묘화.",
  "common painting":
    "빈곤한 농민의 일상을 자주 그렸던 19세기의 프랑스 화가 밀레의 대표작. 배경에는 농장주와 소작민들의 수확 풍경이, 앞쪽에는 가난한 사람들이 바닥에 떨어져 있는 보리 이삭을 줍는 대칭적인 모습이 그려져 있다. 당시에는 빈곤했던 사람을 위해 수확을 할 때 이삭을 일부러 남겨 두는 습관이 있었다고 한다.",
  "detailed painting":
    "에도 시대 중기에 교토에서 활약한 화가 이토 쟈쿠츄가 그렸다. 치밀하고 역동적이며 색채가 풍부한 닭 묘사가 특징. 200년도 더 된 작품임에도 선명한 색을 유지하는 비결 중 하나로, 그림에 사용한 천연 안료와 비단 등 고품질(고가)의 재료가 꼽힌다.",
  "dynamic painting":
    "에도 시대 후기의 대표적인 일본 풍속화 화가, 가쓰시카 호쿠사이가 60세 이후에 시작한 시리즈 작품의 대표적인 그림.36경이라고 이름 지어져 있지만 실제로는 10점이 추가로 그려져서, 총 46점의 작품이 존재한다.",
  "familiar statue":
    "근대 조각의 아버지라고 불리는 프랑스의 조각가 로댕의 너무나 유명한 동상. 원형은 프랑스에 있으며, 20점 이상 주조되어 세계 각국에 흩어져 있는데 모두 진품으로 취급된다.",
  "famous painting":
    "세계에서 가장 유명한 미소. 다 빈치는 마지막까지 이 작품을 아무에게도 넘기지 않았다고 한다. 여전히 많은 사람들이 이 그림의 수많은 수수께끼를 찾아내고, 해결하려고 하고 있다. 그만큼 매력적인 그림이라고 할 수 있을 것이다.",
  "flowery painting":
    "선명한 색채를 찾아 남프랑스 아를로 이주했을 당시에 그린 작품. 노란색은 고흐가 가장 사랑했던 색이라고 한다.고흐가 아를에서 그린 해바라기 그림은 총 7점이며 그중 6개의 작품이 현재까지 남아 있다. ",
  "gallant statue":
    "적을 노려보며 전투를 위해 돌을 던지려는 소년 다비드의 모습을 나타냈다. 미켈란젤로가 3년 이상의 세월에 걸쳐 만들었다고 한다. 눈을 잘 보면 눈동자가 하트 모양인데 당시에는 하트 마크의 개념이 없었기 때문에 눈동자의 빛을 표현한 것으로 추정되고 있다. 그나저나 엄청 크다.",
  "glowing painting":
    "넬슨 제독이 지휘하던 영국 해군의 전함이 제 역할을 마치고 해체장으로 견인되는 모습을 빛의 화가 터너가 다이내믹하게 그려낸 명작.",
  "graceful painting":
    "에도 시대 전기의 일본 풍속화 창시자인 히시카와 모로노부가 그렸다. 판화가 아닌 손으로 직접 그린 풍속화이다. 당시에 최신 유행하는 옷으로 몸을 감싼 여인이 살짝 뒤를 돌아보는 순간의 감각적인 모습이 그려져 있다.",
  "great statue":
    "1810년에 하와이를 통일하여 하와이 왕조를 세운 카메하메하 대왕의 동상. 매년 6월 11일 카메하메하 데이에는 많은 사람들이 레이를 걸어 둔다고 한다.",
  "informative statue":
    "1799년 이집트의 로제타 마을에서 발견된 석판. 고대 이집트의 신성문자(상형문자의 일종)를 해독하는 열쇠가 되었다. 거의 똑같은 문장이 상단에는 신성 문자, 중단에는 민중 문자, 하단에는 그리스 문자로 기록되어 있다.",
  "jolly painting":
    "16세기 후반 이탈리아의 개성적인 화가, 아르침볼도의 주특기였던 기괴한 초상화. 자세히 보면 과일과 채소의 조합이 사람의 옆모습을 이루고 있음을 알 수 있다.",
  "moody painting":
    "밭에 보리씨를 뿌리는 농부의 모습. 파리에서 농촌으로 이주한 무렵에 그린 작품. 대지와 함께 살아가는 농민의 굳센 모습에는 종교적인 의미가 내포되어 있다고 한다. 후대의 화가 고흐에게도 영향을 주었다.",
  "motherly statue":
    "로마의 전설에 나오는 쌍둥이를 키운 늑대. 쌍둥이는 15세기에 만들어 붙였지만, 늑대는 기원전 5세기에 만들어진 역사 깊은 걸작... 으로 알려졌지만 최근 연구로 11~12세기 작품이라는 설이 제기되었다.(본 박물관에서는 그대로 기원전 5세기경으로 표기한다)",
  "moving painting":
    "그리스 로마 신화의 여신 비너스가 조개껍질을 타고 바다에서 탄생하는 모습이 그려져 있다. 보티첼리는 사실 실명이 아니며, 술통처럼 살찐 형의 별명에서 따왔다고 한다. 왜 형의 별명으로 그림을 그렸는지는 의문이다. 일반인들에게도 널리 알려진 그림이지만, 베테랑 디자이너들에게는 특히 익숙한 그림이라고 한다.",
  "mysterious painting":
    "거울처럼 고요한 바다 위, 절벽으로 둘러싸인 묘지 섬에 시체를 실은 작은 배가 소리 없이 다가간다. 공포와 평온함이 공존하는 분위기. 본 것을 사실적으로 묘사하지 않고, 눈에 보이지 않는 인간의 내면과 관념을 표현하려고 했던 상징주의 화가 뵈클린의 작품.",
  "mystic statue":
    "'미녀가 왔다'는 뜻의 이름에 걸맞게 고대 이집트의 3대 미녀 중 하나로 꼽히는 네페르티티 왕비의 흉상. 왼쪽 눈은, 원래는 있었으나 사라진 것인지 처음부터 미완성이었던 것인지 아직 밝혀지지 않았다.",
  "nice painting":
    "군복 차림으로 피리를 부는 소년을 그린 마네의 초기 작품. 텅 빈 배경에 인물을 배치한 구도는 벨라스케스의 영향을 받은 것이다. 원근감이 없고 대비가 강한 색으로 구성된 그의 작품은 후대의 화가들에게 지대한 영향을 미쳐 '인상파의 아버지'로 불린다. 참고로 소년이 불고 있는 것은 '파이프'라는 이름의 피리로, 그림 속의 손가락 모양을 하면 '솔'의 음이 연주된다고 한다.",
  "perfect painting":
    "피카소를 비롯, 후세 화가들에게 막대한 영향을 끼친 '근대 회화의 아버지' 세잔이 그린 정물화. 눈에 보이는 대로 사실적으로 그림을 그린 것이 아니라, 다각적인 시점에서 조형의 아름다움을 추구한 그림이다. 대상물이 뿜어내고 있는 분위기와 보는 사람의 내면까지도 그려내려고 헀던 당시까지는 없었던 작품.",
  "proper painting":
    "여성 뒤편에 있는 커다란 거울을 통해 바를 찾은 사람들로 붐비는 모습이 비춰지고 있다. 자세히 보면 거울에 비친 여성의 뒷모습 위치를 비롯, 물건의 배치 등에 모순점이 많아 많은 의문점이 남겨져 있는 작품이다. 복수의 시점을 조합하여 구성된 마네 최후의 걸작이다. 그는 이 작품이 완성된 이듬해, 51세의 나이로 세상을 떠났다.",
  "quaint painting":
    "계산된 구도와 정교한 빛의 표현으로 '빛의 화가'라고 불리던 페르메이르가 25세 즈음에 그린 작품. 크기가 의외로 작다.",
  "robust statue":
    "고대 그리스의 조각가인 미론의 작품을 본떠 만들어진 고대 로마의 작품. 인체의 아름다움을 잘 표현하고 있어 어느 각도에서 봐도 아름답다.",
  "rock-head statue":
    "고대 멕시코 지역에 존재한 올메카 문명의 유적에서 발견된 거대 석상. 올메크 두상이라고도 불린다. 큰 것은 높이가 3미터나 되는 것도 있다. 몸통은 존재하지 않으며, 머리만 만들어진 것으로 추정되고 있다.",
  "scary painting":
    "에도 시대 중기 풍속화 화가 도슈사이 샤라쿠가 그린 배우. 샤라쿠는 140장 정도의 풍속화를 남겼는데 활동 기간은 약 10개월이었다고 한다.",
  "scenic painting":
    "브뤼헐은 르네상스 후기의 풍경화 화가로 그림에 농민의 생활을 많이 담아 '농민 화가'로 불리기도 한다. 사냥에 실패해서 지쳐 있는 앞쪽의 사냥꾼들과 꽁꽁 언 호수에서 스케이트를 즐기는 뒤쪽 사람들의 대비에서 독특한 정서가 느껴진다.",
  "serene painting":
    "다 빈치가 그린 여성의 초상화는 '모나리자'를 포함해서 4작품밖에 없다고 하며, 이 그림은 그중 하나이다. 안고 있는 동물은 사실 흰 담비가 아니라 흰 털을 가진 페럿이라는 설도 있다.",
  "sinking painting":
    '오필리아는 셰익스피어의 희곡 "햄릿"에 등장하는 비극의 히로인이다.치밀하고 아름답게 묘사된 자연 속, 이성을 잃고 강물에 뛰어든 그녀가 생사의 경계에서 보이는 숭고한 표정은 보는 이의 마음을 사로잡는다.',
  "solemn painting":
    "스페인 왕국에서 일하던 벨라스케스의 명작. 어린 공주와 시중을 드는 여인들이 등장해서 '시녀들'이라는 의미의 제목이 붙여졌다. 그림 왼쪽의 화가는 벨라스케스 본인이며 그 오른쪽의 거울에 비친 인물은 국왕과 왕비이다. 결국 이 그림은 벨라스케스가 국왕과 왕비를 그리고 있는 모습을 국왕의 시선으로 그린 장면인 것이다.",
  "tremendous statue":
    "고대 중국의 가장 크고 무거운 청동 제기. 그릇의 안쪽 벽에 새겨진 글귀에는 왕이 어머니의 제사를 위해 주조하였다고 적혀 있다.",
  "twinkling painting":
    "정신병으로 입원해서 요양 중일 때 그린, 말년 고흐의 대표작. 병실에서 보이는 풍경 그대로가 아니라, 기억과 상상이 더해져 있다. 다른 화가에게 보낸 편지에서 이 작품을 실패작이라고 언급하고 있어, 고흐 스스로는 작품에 만족하지 못했다는 것을 알 수 있다.",
  "valiant statue":
    "사모트라케에서 발견된 조각상. 승리의 여신 니케가 뱃머리에 내려선 모습이 표현되어 있다. 발견 당시에 조각조각으로 흩어져 있던 것을 끼워 맞춰 복원했지만, 머리와 양팔은 발견되지 않았다.",
  "warm painting":
    "고야는 18세기 후반에서 19세기 전반에 걸쳐 활약했던 스페인의 거장. '옷을 입은 마하'는 '옷을 벗은 마하'라는 쌍을 이루는 작품을 숨기기 위해 그려졌다는 설이 있다. '마하'는 '매력적인 여자'라는 뜻으로, 사람의 이름은 아니다.",
  "warrior statue":
    "진시황제를 사후 세계에서 지키기 위해 부장된 도제 병사 인형. 2000년의 세월이 지난 1974년에 8000점 가량이 발견되었다. 사람 크기의 조각상은 어느 한 점도 찍어 낸 것이 없고, 하나하나 손수 만들어서 표정과 복장, 몸짓이 전부 다르다고 한다.",
  "wild painting left half":
    "배경을 금박으로 가득 채우고 역동적인 필치로 풍신과 뇌신을 그린 한 쌍의 병풍. 에도 시대 초기의 화가인 다와라야 소타쓰의 걸작이다. 주제의 간략화 및 패턴화, 배경을 생략하는 디자인 기법은 후에 오가타 고린이 계승하여, 린파라는 화풍으로 이어졌다.",
  "wild painting right half":
    "배경을 금박으로 가득 채우고 역동적인 필치로 풍신과 뇌신을 그린 한 쌍의 병풍. 에도 시대 초기의 화가인 다와라야 소타쓰의 걸작이다. 주제의 간략화 및 패턴화, 배경을 생략하는 디자인 기법은 후에 오가타 고린이 계승하여, 린파라는 화풍으로 이어졌다.",
  "wistful painting":
    "당시 고가 그림물감이었던 울트라마린 색상을 아낌없이 사용, 선명한 푸른색이 눈길을 끈다. 사실 그림 속 귀고리는 진주가 아니라는 설도 있다고 한다.",
  "worthy painting":
    "19세기 프랑스 낭만주의의 대표적 화가 들라크루아가 프랑스에서 1830년에 일어난 7월 혁명을 배경으로 같은 해에 그린 그림. 중앙에 있는 여성은 '잔다르크'라는 오해를 받고 있지만 실은 가공의 여성인 '마리안느'가 모델이라고 한다.",
};

export const artAuthenticityKoMap: Record<ArtName, string> = {
  "academic painting":
    "위조품에는 오른쪽 상단 모서리에 커피 얼룩이 있습니다. 위조품에는 캔버스 뒷면에도 열쇠가 테이프로 붙어 있습니다. 얼룩과 열쇠가 없다면 진품입니다.",
  "amazing painting":
    "위조품에서 검은색 옷을 입은 가운데 남성은 모자를 쓰지 않고 있습니다. 남성이 모자를 가지고 있다면 진짜입니다.",
  "ancient statue":
    "위조된 조각상에는 머리에 더듬이 한 쌍이 있습니다. 또한 위조된 조각상의 눈은 밤에 빛나고 일반 가구와 상호작용하면 떠다니게 됩니다. 조각상에 더듬이 한 쌍이 없다면 진품입니다.",
  "basic painting":
    "위조품에서 소년은 긴 앞머리가 있는 그릇 머리를 하고 있습니다. 머리가 짧고 웨이브가 있는 경우 진품입니다.",
  "beautiful statue":
    "위조품에는 목에 목걸이가 세 개 있습니다. 목걸이가 없다면 진품입니다.",
  "calm painting": "", // 진품만 존재
  "common painting": "", // 진품만 존재
  "detailed painting":
    "위조품에서는 꽃이 보라색이고 왼쪽 가장자리에 도장과 서명이 없습니다. 파란색 꽃이 있고 도장과 서명이 있는 경우 정품입니다.",
  "dynamic painting": "", // 진품만 존재
  "familiar statue": "", // 진품만 존재
  "famous painting":
    "위조품에서는 여성의 눈썹이 올라갑니다. 눈썹이 느슨하면 진품입니다.",
  "flowery painting": "", // 진품만 존재
  "gallant statue":
    "위조품에서 다비드는 팔과 허리 사이에 책을 들고 있는 모습이 나옵니다. 다비드에게 책이 없다면 진품입니다.",
  "glowing painting": "", // 진품만 존재
  "graceful painting":
    "가품은 목의 흰 깃이 없으며, 인물이 화면을 거의 가득 채우고 있습니다. 또한 가품 속 여성은 가끔 반대 방향을 바라보기도 합니다. 목에 흰 깃이 있고 화면에서 차지하는 비중이 더 작다면 진품입니다.",
  "great statue": "", // 진품만 존재
  "informative statue":
    "가품은 로제타석이 파란색이며 밤에 빛이 납니다. 로제타석이 칙칙한 회색이라면 진품입니다.",
  "jolly painting":
    "가품은 몸통에 있어야 할 아티초크가 없습니다. 몸통에 아티초크가 있다면 진품입니다.",
  "moody painting": "", // 진품만 존재
  "motherly statue":
    "가품은 암늑대의 입 밖으로 혀가 나와 있습니다. 혀가 보이지 않으면 진품입니다.",
  "moving painting":
    "가품은 오른쪽 여성 뒤로 하늘이 선명하게 보이며, 꽃들이 흩날리고 있습니다. 여성 뒤에 나무가 보인다면 진품입니다.",
  "mysterious painting": "", // 진품만 존재
  "mystic statue":
    "가품은 네페르티티의 오른쪽 귀에 귀걸이가 있습니다. 귀걸이가 없다면 진품입니다.",
  "nice painting": "", // 진품만 존재
  "perfect painting": "", // 진품만 존재
  "proper painting": "", // 진품만 존재
  "quaint painting":
    "가품은 항아리에서 흘러나오는 우유 줄기가 굵고 선명합니다. 우유 줄기가 가늘다면 진품입니다.",
  "robust statue":
    "가품은 오른쪽 손목에 손목시계를 차고 있습니다. 손목시계가 없다면 진품입니다.",
  "rock-head statue":
    "가품은 입술이 살짝 올라가 미소를 짓고 있습니다. 입술이 무표정에 가깝다면 진품입니다.",
  "scary painting":
    "가품은 눈썹이 위쪽 안쪽으로 기울어 슬퍼 보입니다. 또한 가품 속 인물은 가끔 미소를 짓습니다. 눈썹이 아래쪽 안쪽으로 기울어 화난 표정처럼 보인다면 진품입니다.",
  "scenic painting":
    "가품은 왼쪽 아래에 사냥꾼이 한 명만 있습니다. 사냥꾼이 두 명이라면 진품입니다.",
  "serene painting":
    "가품은 여성이 검은색과 흰색 무늬가 있는 흰담비를 안고 있습니다. 순백색 흰담비를 안고 있다면 진품입니다.",
  "sinking painting": "", // 진품만 존재
  "solemn painting":
    "가품은 배경의 남성이 오른손을 들어 손을 흔드는 듯한 자세를 하고 있습니다. 팔이 커튼 뒤로 가려져 있다면 진품입니다.",
  "tremendous statue":
    "가품은 윗부분에 뚜껑이 있습니다. 윗부분이 열려 있다면 진품입니다.",
  "twinkling painting": "", // 진품만 존재
  "valiant statue":
    "가품은 좌우가 뒤바뀌어 있으며, 왼쪽 다리가 앞으로 나와 있고 오른쪽 날개가 더 작아 보입니다. 오른쪽 다리가 앞으로 나와 있고 왼쪽 날개가 더 작아 보인다면 진품입니다.",
  "warm painting": "", // 진품만 존재
  "warrior statue": "가품은 병사가 삽을 들고 있습니다. 삽이 없다면 진품입니다.",
  "wild painting left half":
    "가품은 뇌신(라이진)의 몸 색이 흰색이 아닌 초록색입니다. 뇌신이 흰색이라면 진품입니다.",
  "wild painting right half":
    "가품은 풍신(후진)의 몸 색이 초록색이 아닌 흰색입니다. 풍신이 초록색이라면 진품입니다.",
  "wistful painting":
    "가품은 귀걸이가 별 모양입니다. 또한 가품 속 여성은 가끔 눈을 떴다 감았다 합니다. 귀걸이가 둥근 모양이라면 진품입니다.",
  "worthy painting": "", // 진품만 존재
};

export const artTypeKoMap: Record<string, string> = {
  Painting: "명화",
  Statue: "조각",
};

export const artAvailabilityKoMap: Record<string, string> = {
  "Jolly Redd's Treasure Trawler": "여욱 방문 시 구매",
};

const getFilledMapping = (
  map: Record<string, string>,
  key: string | undefined,
): string | undefined => {
  if (!key) return undefined;

  const mappedValue = map[key] ?? map[key.toLowerCase()];
  return mappedValue?.trim() ? mappedValue : undefined;
};

export const formatArtType = (type: string) => artTypeKoMap[type] ?? type;

export const formatArtAvailability = (availability: string | undefined) =>
  getFilledMapping(artAvailabilityKoMap, availability) ??
  availability ??
  "정보 없음";

export const formatArtYear = (year: string | undefined) => {
  if (!year) return "정보 없음";

  const normalizedYear = year.trim();

  if (/^circa\s+\d+\s*(BCE|BC)$/i.test(normalizedYear)) {
    const yearValue = normalizedYear
      .replace(/^circa\s+/i, "")
      .replace(/\s*(BCE|BC)$/i, "");
    return `기원전 ${yearValue}년경`;
  }

  if (/^circa\s+\d+/i.test(normalizedYear)) {
    return `${normalizedYear.replace(/^circa\s+/i, "")}년경`;
  }

  if (/^\d+\s*-\s*\d+\s*(BCE|BC)$/i.test(normalizedYear)) {
    const yearRange = normalizedYear.replace(/\s*(BCE|BC)$/i, "");
    return `기원전 ${yearRange}년`;
  }

  if (/^\d+\s*(BCE|BC)$/i.test(normalizedYear)) {
    const yearValue = normalizedYear.replace(/\s*(BCE|BC)$/i, "");
    return `기원전 ${yearValue}년`;
  }

  if (/^\d+(st|nd|rd|th)\s+century\s*(BCE|BC)$/i.test(normalizedYear)) {
    const century = normalizedYear
      .replace(/(st|nd|rd|th)\s+century\s*(BCE|BC)$/i, "")
      .trim();
    return `기원전 ${century}세기`;
  }

  if (/^\d+(st|nd|rd|th)\s+century\s*CE$/i.test(normalizedYear)) {
    const century = normalizedYear
      .replace(/(st|nd|rd|th)\s+century\s*CE$/i, "")
      .trim();
    return `${century}세기경`;
  }

  if (/^\d+(st|nd|rd|th)\s+century$/i.test(normalizedYear)) {
    const century = normalizedYear.replace(/(st|nd|rd|th)\s+century$/i, "");
    return `${century}세기`;
  }

  if (/^\d+$/.test(normalizedYear)) {
    return `${normalizedYear}년`;
  }

  return normalizedYear;
};

export const formatArtOriginalTitle = (
  name: string,
  fallback: string | undefined,
) => getFilledMapping(artOriginalTitleKoMap, name) ?? fallback ?? "정보 없음";

export const formatArtAuthor = (name: string, fallback: string | undefined) =>
  getFilledMapping(artAuthorKoMap, name) ?? fallback ?? "정보 없음";

export const formatArtStyle = (name: string, fallback: string | undefined) =>
  getFilledMapping(artStyleKoMap, name) ?? fallback ?? "정보 없음";

export const formatArtDescription = (
  name: string,
  fallback: string | undefined,
) => getFilledMapping(artDescriptionKoMap, name) ?? fallback;

export const formatArtAuthenticity = (
  name: string,
  fallback: string | undefined,
) => getFilledMapping(artAuthenticityKoMap, name) ?? fallback;
