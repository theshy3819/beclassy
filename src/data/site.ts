// All copy and store facts in one place. Sources: Naver Place (2026-11), Instagram bio,
// latest visitor blog post, and the owner's notes. KO is the default locale, EN mirrors it.

export type Lang = 'ko' | 'en';
export type L10n = Record<Lang, string>;

export const brand = {
  name: 'BECLASSY',
  tagline: 'COFFEE & BAKERY',
  slogan: { ko: 'BECLASSY THAN BE TRENDY', en: 'BECLASSY THAN BE TRENDY' },
  promise: {
    ko: '언제나 기본을 지키며, 맛있는 기억을 전달하는 공간',
    en: 'Keeping to the basics, always — a place that leaves a delicious memory.',
  },
  instagram: 'https://www.instagram.com/beclassy.___',
  instagramHandle: '@beclassy.___',
  kakao: { ko: '카카오톡 채널 [비클래시]', en: 'KakaoTalk channel “비클래시”' },
};

export type StoreId = 'eulwangni' | 'naju';

export interface Store {
  id: StoreId;
  name: L10n;
  short: L10n;
  badge: L10n;
  address: L10n;
  hours: L10n;
  lastOrder: string;
  open: string;
  close: string;
  phone?: string;
  parking: L10n;
  lat: number;
  lng: number;
  naver: string;
  facilities: Record<Lang, string[]>;
  notes: Record<Lang, string[]>;
  intro: L10n;
}

export const stores: Record<StoreId, Store> = {
  eulwangni: {
    id: 'eulwangni',
    name: { ko: '비클래시 을왕리점', en: 'BECLASSY Eulwangni' },
    short: { ko: '을왕리', en: 'Eulwangni' },
    badge: { ko: 'FLAGSHIP · MEDIA ART', en: 'FLAGSHIP · MEDIA ART' },
    address: { ko: '인천 영종구 용유서로 402-11', en: '402-11 Yongyuseo-ro, Yeongjong-gu, Incheon' },
    hours: { ko: '매일 10:00 – 21:30', en: 'Daily 10:00 – 21:30' },
    lastOrder: '21:00',
    open: '10:00',
    close: '21:30',
    phone: '0507-1474-1444',
    parking: {
      ko: '지하·지상 주차장 · 매장 이용 시 2시간 무료, 이후 30분당 1,000원',
      en: 'Underground & surface parking · 2 hours free for guests, then ₩1,000 per 30 min',
    },
    lat: 37.4536938,
    lng: 126.3735837,
    naver: 'https://naver.me/5Rh0sWiz',
    facilities: {
      ko: ['1층 미디어아트 갤러리', '테라스 · 루프탑', '매장 로스터리', '단체석', '무선 인터넷', '유아의자 · 수유실 · 기저귀 교환대', '휠체어 출입 · 좌석', '장애인 주차구역'],
      en: ['1F media art gallery', 'Terrace & rooftop', 'In-store roastery', 'Group seating', 'Wi-Fi', 'High chairs, nursing room, changing table', 'Wheelchair access & seating', 'Accessible parking'],
    },
    notes: {
      ko: ['1인 1음료 주문을 부탁드립니다.', '반려동물은 동반 입장이 어렵습니다.', '아이와 함께 오실 수 있어요. 보호자께서 함께 살펴주세요.'],
      en: ['One drink per guest, please.', 'Pets are not allowed inside.', 'Children are welcome — please keep them close.'],
    },
    intro: {
      ko: '을왕리 바다 곁, 블랙 매스와 노출 콘크리트로 지은 4개 층의 베이커리 카페. 1층 미디어아트 갤러리부터 서해가 보이는 루프탑까지 이어집니다.',
      en: 'A four-storey bakery café of black masonry and board-formed concrete by the Eulwangni coast — from the media art gallery on the ground floor to a rooftop facing the West Sea.',
    },
  },
  naju: {
    id: 'naju',
    name: { ko: '비클래시 나주점', en: 'BECLASSY Naju' },
    short: { ko: '나주', en: 'Naju' },
    badge: { ko: 'RIVER VIEW', en: 'RIVER VIEW' },
    address: { ko: '전남 나주시 노안면 건재로 524-11', en: '524-11 Geonjae-ro, Noan-myeon, Naju, Jeollanam-do' },
    hours: { ko: '매일 10:00 – 21:00', en: 'Daily 10:00 – 21:00' },
    lastOrder: '20:30',
    open: '10:00',
    close: '21:00',
    parking: { ko: '넓은 무료 주차장', en: 'Large free parking lot' },
    lat: 35.0642975,
    lng: 126.7525721,
    naver: 'https://naver.me/FDnS01zA',
    facilities: {
      ko: ['4개 층 실내 공간', '야외 테라스 · 루프탑', '매장 로스터리', '단체 이용', '포장', '무선 인터넷', '휠체어 출입 · 좌석'],
      en: ['Four indoor floors', 'Terrace & rooftop', 'In-store roastery', 'Groups welcome', 'Takeout', 'Wi-Fi', 'Wheelchair access & seating'],
    },
    notes: {
      ko: ['1인 1음료 주문을 부탁드립니다.'],
      en: ['One drink per guest, please.'],
    },
    intro: {
      ko: '영산강 승촌보의 탁 트인 풍경을 마주한 첫 번째 비클래시. 4개 층의 넓은 실내와 테라스, 루프탑에서 강과 들판을 바라봅니다.',
      en: 'The first BECLASSY, facing the open view of the Yeongsan River and Seungchon Weir — four floors, a terrace and a rooftop over the river plain.',
    },
  },
};

export const mapLinks = (s: Store) => ({
  naver: s.naver,
  kakao: `https://map.kakao.com/link/map/${encodeURIComponent(s.name.ko)},${s.lat},${s.lng}`,
  google: `https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lng}`,
});

export interface Floor {
  level: string;
  name: string;
  kr: string;
  desc: L10n;
  image: string;
  alt: L10n;
}

export const floors: Floor[] = [
  {
    level: '1F',
    name: 'MEDIA ART GALLERY',
    kr: '미디어아트 갤러리',
    desc: {
      ko: '층고 높은 아트리움에 대형 미디어아트 큐브와 파노라마 월이 놓여 있습니다. 테마에 따라 바뀌는 영상과 대형 회화가 전시관 같은 몰입감을 만듭니다.',
      en: 'A tall atrium with a suspended media art cube and a panoramic wall. Themed films and large paintings turn the ground floor into a gallery.',
    },
    image: 'f1-ocean',
    alt: { ko: '바닷속 장면이 흐르는 1층 미디어아트 월과 좌석', en: 'Ground-floor media art wall showing an underwater scene above the seating' },
  },
  {
    level: '2F',
    name: 'BAKERY & BREW BAR',
    kr: '베이커리 & 브루 바',
    desc: {
      ko: '매일 구워낸 빵이 가득한 쇼케이스와 세 가지 블렌드를 내리는 오픈 바. 대형 회화 아래에서 주문합니다.',
      en: 'A showcase full of the day’s bakes and an open bar pulling three house blends, beneath a wall of large paintings.',
    },
    image: 'f2-counter',
    alt: { ko: '대형 회화 아래 베이커리 쇼케이스와 커피 바', en: 'Bakery showcase and coffee bar beneath a wall of colourful paintings' },
  },
  {
    level: '3F',
    name: 'TERRACE LOUNGE',
    kr: '테라스 라운지',
    desc: {
      ko: '탁 트인 풍경을 마주한 라운지와 테라스. 창 너머로 섬과 바다가 보이는 자리에서 천천히 머물러 보세요.',
      en: 'A lounge and terrace facing the open view — sit by the glass and watch the islands and the sea.',
    },
    image: 'f3-terrace-view',
    alt: { ko: '통유리 너머 바다와 섬이 보이는 3층 테라스', en: 'Third-floor terrace with the sea and islands beyond the glass' },
  },
  {
    level: '4F',
    name: 'ROOFTOP',
    kr: '루프탑',
    desc: {
      ko: '멀리 서해가 내려다보이는 루프탑. 해 질 무렵이면 을왕리의 노을이 내려앉습니다.',
      en: 'A rooftop looking out to the West Sea. At dusk, the Eulwangni sunset settles over it.',
    },
    image: 'f4-rooftop-ring',
    alt: { ko: '원형 난간과 바다가 보이는 4층 루프탑', en: 'Rooftop with a circular railing and the sea on the horizon' },
  },
];

export interface Bake {
  id: string;
  ko: string;
  en: string;
  desc?: L10n;
}

export const bakes: Bake[] = [
  { id: 'bk-montblanc', ko: '몽블랑', en: 'Mont Blanc', desc: { ko: '속까지 크림을 가득 채운 비클래시의 대표 빵', en: 'Our signature — filled to the core with cream' } },
  { id: 'bk-dirty-choco', ko: '더티초코', en: 'Dirty Choco', desc: { ko: '초코 필링을 가득 채우고 코코아 파우더를 듬뿍', en: 'Packed with chocolate filling, dusted with cocoa' } },
  { id: 'bk-croissant-loaf', ko: '크루아상 식빵', en: 'Croissant Loaf' },
  { id: 'bk-vanilla-montblanc', ko: '바닐라 크림 몽블랑', en: 'Vanilla Cream Mont Blanc' },
  { id: 'bk-tart', ko: '시즌 타르트', en: 'Seasonal Tart', desc: { ko: '계절 과일에 따라 바뀌는 타르트', en: 'Changes with the fruit of the season' } },
  { id: 'bk-croissant', ko: '크루아상', en: 'Croissant' },
  { id: 'bk-kaya', ko: '카야버터 크루아상', en: 'Kaya Butter Croissant' },
  { id: 'bk-anbutter', ko: '앙버터 크루아상', en: 'Red Bean Butter Croissant' },
  { id: 'bk-blueberry', ko: '블루베리크림 크루아상', en: 'Blueberry Cream Croissant' },
  { id: 'bk-pastry-pie', ko: '페스츄리 파이', en: 'Pastry Pie' },
  { id: 'bk-pie', ko: '파이', en: 'Pie', desc: { ko: '애플파이, 고구마 파이 등', en: 'Apple, sweet potato and more' } },
  { id: 'bk-sausage', ko: '소시지빵', en: 'Sausage Bread' },
];

export interface Blend {
  id: string;
  name: string;
  kr: string;
  note: L10n;
  color: string;
  price200g: string;
}

export const blends: Blend[] = [
  { id: 'jet-black', name: 'JET BLACK', kr: '젯블랙', note: { ko: '깊고 진한, 원두 본연의 향미', en: 'Deep and bold — the bean’s own character' }, color: '#0d0d0e', price200g: '14,000' },
  { id: 'mystic-violet', name: 'MYSTIC VIOLET', kr: '미스틱 바이올렛', note: { ko: '은은한 산미와 향긋하고 달콤한 꽃향', en: 'Gentle acidity with a sweet floral nose' }, color: '#4b3a9e', price200g: '17,000' },
  { id: 'eclipse', name: 'ECLIPSE', kr: '이클립스 · 디카페인', note: { ko: '부드럽고 고소한 디카페인', en: 'A smooth, nutty decaf' }, color: '#6e5a3e', price200g: '17,000' },
];

export interface MenuItem {
  ko: string;
  en: string;
  price?: string;
  desc?: L10n;
  tag?: L10n;
  image?: string;
  /** Image is a transparent cut-out (shown whole, on a colour field) rather than a photo to crop. */
  cutout?: boolean;
}

export interface MenuGroup {
  id: string;
  title: string;
  kr: string;
  note?: L10n;
  items: MenuItem[];
}

const iceOnly: L10n = { ko: 'ICE ONLY', en: 'ICE ONLY' };

export const signatures: MenuItem[] = [
  { ko: '미스틱블룸', en: 'Mystic Bloom', price: '8,800', tag: iceOnly, image: 'dr-mystic-bloom', cutout: true, desc: { ko: '미스틱 바이올렛 커피크림과 은은한 플로럴 아로마의 라떼', en: 'A latte of Mystic Violet coffee cream with a soft floral aroma' } },
  { ko: '소보루라떼', en: 'Soboro Latte', price: '8,500', image: 'dr-soboro', desc: { ko: '젯블랙과 시나몬, 고소한 소보루가 어우러지는 크림라떼', en: 'Jet Black, cinnamon and nutty soboro crumble in a cream latte' } },
  { ko: '웨스턴라이트', en: 'Western Light', price: '8,500', image: 'dr-western', tag: { ko: '을왕리점 한정 · ICE ONLY', en: 'EULWANGNI ONLY · ICE ONLY' }, desc: { ko: '석양이 떠오르는 다채로운 색감의 달콤상큼한 음료', en: 'Sweet and bright, layered in the colours of a West Sea sunset' } },
];

export const menu: MenuGroup[] = [
  { id: 'signature', title: 'SIGNATURE', kr: '시그니처', items: signatures },
  {
    id: 'coffee',
    title: 'COFFEE',
    kr: '커피',
    note: { ko: '원두 선택 · 젯블랙 / 미스틱 바이올렛 / 이클립스(디카페인)', en: 'Choose your beans · Jet Black / Mystic Violet / Eclipse (decaf)' },
    items: [
      { ko: '에스프레소', en: 'Espresso', price: '6,000' },
      { ko: '아메리카노', en: 'Americano', price: '6,000', image: 'dr-americano' },
      { ko: '카페라떼', en: 'Caffè Latte', price: '6,500', image: 'dr-latte' },
      { ko: '바닐라라떼', en: 'Vanilla Latte', price: '7,500', image: 'dr-vanilla', desc: { ko: '시럽이 아닌 직접 만든 바닐라 베이스', en: 'House-made vanilla base, not syrup' } },
      { ko: '모카라떼', en: 'Mocha Latte', price: '7,500', desc: { ko: '직접 만든 초코 베이스', en: 'House-made chocolate base' } },
    ],
  },
  {
    id: 'non-coffee',
    title: 'NON-COFFEE',
    kr: '논커피',
    items: [
      { ko: '초코라떼', en: 'Chocolate Latte', price: '7,000' },
      { ko: '녹차라떼', en: 'Green Tea Latte', price: '7,000' },
      { ko: '고구마라떼 / 고구마스무디', en: 'Sweet Potato Latte / Smoothie', price: '7,000' },
      { ko: '딸기라떼', en: 'Strawberry Latte', price: '8,000', tag: iceOnly, desc: { ko: '직접 담근 딸기청', en: 'House-made strawberry preserve' } },
      { ko: '딸기말차라떼', en: 'Strawberry Matcha Latte', price: '7,800', tag: iceOnly },
      { ko: '요거트스무디', en: 'Yogurt Smoothie', price: '7,000', desc: { ko: '블루베리 / 플레인 / 딸기 / 망고', en: 'Blueberry / Plain / Strawberry / Mango' } },
      { ko: '수제청에이드', en: 'House Fruit Ade', price: '7,500', desc: { ko: '키위 / 레몬 / 자몽', en: 'Kiwi / Lemon / Grapefruit' } },
      { ko: '생과일주스', en: 'Fresh Fruit Juice', price: '7,500', desc: { ko: '과일은 상황에 따라 바뀔 수 있습니다', en: 'Fruit varies with availability' } },
    ],
  },
  {
    id: 'tea',
    title: 'TEA',
    kr: '티',
    items: [
      { ko: '비클래시 블렌딩티', en: 'BECLASSY Blend Tea', price: '7,500', desc: { ko: '레몬피치 / 루이선셋 / 서머민트', en: 'Lemon Peach / Louis Sunset / Summer Mint' } },
      { ko: '로네펠트 허브티', en: 'Ronnefeldt Herbal Tea', price: '6,500', desc: { ko: '바닐라루이보스 / 소프트피치 / 페퍼민트 / 프룻티캐모마일', en: 'Vanilla Rooibos / Soft Peach / Peppermint / Fruity Chamomile' } },
      { ko: '수제과일차', en: 'House Fruit Tea', price: '6,500', desc: { ko: '레몬 / 자몽 / 키위', en: 'Lemon / Grapefruit / Kiwi' } },
    ],
  },
  {
    id: 'beans',
    title: 'BEANS',
    kr: '원두',
    note: { ko: '매장에서 원두 향을 직접 맡아보고 고를 수 있습니다.', en: 'Smell each blend in store before you choose.' },
    items: [
      { ko: '블렌딩 원두 200g · 젯블랙', en: 'Blend beans 200g · Jet Black', price: '14,000' },
      { ko: '블렌딩 원두 200g · 미스틱 바이올렛', en: 'Blend beans 200g · Mystic Violet', price: '17,000' },
      { ko: '블렌딩 원두 200g · 이클립스(디카페인)', en: 'Blend beans 200g · Eclipse (decaf)', price: '17,000' },
      { ko: '드립백 세트', en: 'Drip bag set', desc: { ko: '구성과 가격은 매장에 문의해 주세요', en: 'Ask in store for sets and prices' } },
    ],
  },
];

export const ui = {
  ko: {
    nav: { space: 'SPACE', media: 'MEDIA ART', bakery: 'BAKERY', coffee: 'COFFEE', menu: 'MENU', stores: 'STORES' },
    skip: '본문 바로가기',
    menuOpen: '메뉴 열기',
    menuClose: '메뉴 닫기',
    pause: '영상 일시정지',
    play: '영상 재생',
    scroll: 'SCROLL',
    open: 'OPEN',
    lastOrder: '라스트오더',
    hours: '영업시간',
    address: '주소',
    phone: '전화',
    parking: '주차',
    facilities: '편의시설',
    notes: '이용 안내',
    directions: '오시는 길',
    storeGuide: '지점 안내',
    viewMenu: '전체 메뉴 보기',
    call: '전화하기',
    naverMap: '네이버 지도',
    kakaoMap: '카카오맵',
    googleMap: '구글 지도',
    inquiry: '문의',
    priceNote: '메뉴와 가격은 지점·시즌에 따라 달라질 수 있습니다. 가격 단위: 원',
    bakeryPriceNote: '베이커리 라인업과 가격은 매일·지점별로 다르며 매장에서 확인하실 수 있습니다.',
    otherBakes: '그 외에도 매일 다양한 빵과 구움과자를 굽습니다.',
    floorsTitle: 'FLOOR GUIDE',
    backHome: '메인으로',
    langLabel: 'Language',
  },
  en: {
    nav: { space: 'SPACE', media: 'MEDIA ART', bakery: 'BAKERY', coffee: 'COFFEE', menu: 'MENU', stores: 'STORES' },
    skip: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    pause: 'Pause video',
    play: 'Play video',
    scroll: 'SCROLL',
    open: 'OPEN',
    lastOrder: 'Last order',
    hours: 'Hours',
    address: 'Address',
    phone: 'Phone',
    parking: 'Parking',
    facilities: 'Facilities',
    notes: 'Good to know',
    directions: 'Directions',
    storeGuide: 'Store guide',
    viewMenu: 'Full menu',
    call: 'Call',
    naverMap: 'Naver Map',
    kakaoMap: 'Kakao Map',
    googleMap: 'Google Maps',
    inquiry: 'Contact',
    priceNote: 'Menu and prices may vary by store and season. Prices in KRW.',
    bakeryPriceNote: 'The bakery line-up and prices change daily and by store — see the showcase in store.',
    otherBakes: 'Plus a changing range of breads and baked treats every day.',
    floorsTitle: 'FLOOR GUIDE',
    backHome: 'Home',
    langLabel: 'Language',
  },
} as const;

export const home = {
  ko: {
    heroEyebrow: 'COFFEE & BAKERY — EULWANGNI',
    heroSub: '언제나 기본을 지키며, 맛있는 기억을 전달하는 공간',
    arriveLabel: 'ARRIVE',
    arriveTitle: '을왕리 바다 곁,<br>네 개의 층으로 지은<br><strong>갤러리 같은 베이커리 카페</strong>',
    arriveBody: '경사로를 따라 블랙 매스와 원형 게이트를 지나면, 1층의 미디어아트가 빛으로 맞이합니다. 매일 굽는 빵과 직접 로스팅한 커피, 그리고 서해의 노을이 내려앉는 루프탑까지.',
    statement: '기본을 지키는 일이 가장 클래식한 일이라고 믿습니다. 좋은 재료로 매일 굽고, 원두는 직접 볶고, 공간은 하루도 빠짐없이 가꿉니다.',
    archLabel: 'ARCHITECTURE',
    archTitle: 'A MONOLITH<br>ON THE HILL',
    archKr: '언덕 위의 검은 모노리스',
    archBody: '검은 매스와 결이 살아있는 콘크리트 벽, 하늘을 향해 열린 원형 개구부. 경사로를 오르는 순간부터 공간의 경험이 시작됩니다.',
    stats: [
      { value: '4', unit: 'FLOORS', label: '미디어아트부터 루프탑까지 4개 층' },
      { value: '1F', unit: 'MEDIA ART', label: '층고 높은 아트리움의 미디어아트' },
      { value: '3', unit: 'BLENDS', label: '매장에서 직접 로스팅하는 세 가지 블렌드' },
      { value: '2H', unit: 'FREE PARKING', label: '지하·지상 주차, 매장 이용 시 2시간 무료' },
    ],
    archCaption: '하늘로 열린 원형 개구부와 노출 콘크리트 게이트',
    floorsLabel: 'FLOOR GUIDE',
    floorsHint: '스크롤하면 한 층씩 올라갑니다',
    mediaLabel: '1F — MEDIA ART',
    mediaTitle: '빛으로 채운 1층',
    mediaBody: '대형 스크린 큐브와 파노라마 월 위로 아트 영상이 흐릅니다. 바다, 우주, 색채 — 테마가 바뀔 때마다 공간 전체가 다른 장면이 됩니다.',
    mediaNote: '미디어아트 콘텐츠는 시즌과 테마에 따라 바뀝니다.',
    themes: [
      { name: 'OCEAN', kr: '바다', image: 'f1-wave' },
      { name: 'COSMOS', kr: '우주', image: 'f1-cosmos' },
      { name: 'COLOR FIELD', kr: '색채', image: 'f1-color' },
      { name: 'DEEP BLUE', kr: '심해', image: 'f1-wave-wall' },
    ],
    bakeryLabel: 'BAKERY',
    bakeryTitle: 'BAKED<br>DAILY',
    bakeryKr: '매일 아침, 오늘의 빵',
    bakeryBody: '고급 재료로 매일 아침 정성껏 구워냅니다. 겹겹이 결이 살아있는 크루아상부터 속까지 크림을 채운 몽블랑, 계절 과일을 올린 타르트까지.',
    bakeryCaption: '반죽부터 굽기까지, 매일 새로 만듭니다',
    showcaseCaption: '2F 쇼케이스',
    coffeeLabel: 'COFFEE',
    coffeeTitle: 'ROASTED<br>IN-HOUSE',
    coffeeKr: '직접 볶은 세 가지 블렌드',
    coffeeBody: '프리미엄 스페셜티 원두를 매장에서 직접 로스팅합니다. 세 가지 블렌드 중 취향에 맞는 원두로 골라 주문하세요. 원두 향을 맡아보고 구매할 수도 있습니다.',
    signatureLabel: 'SIGNATURE',
    retail: '원두 200g · 드립백 세트 매장 판매',
    storesLabel: 'STORES',
    storesTitle: 'VISIT<br>BECLASSY',
    storesKr: '두 곳의 비클래시',
  },
  en: {
    heroEyebrow: 'COFFEE & BAKERY — EULWANGNI',
    heroSub: 'Keeping to the basics, always — a place that leaves a delicious memory.',
    arriveLabel: 'ARRIVE',
    arriveTitle: 'By the Eulwangni coast,<br>a bakery café built<br><strong>like a gallery, four floors high</strong>',
    arriveBody: 'Walk up the ramp, past the black monolith and through the round gate, and the media art on the ground floor greets you in light. Then the day’s bakes, coffee roasted in-house, and a rooftop where the West Sea sunset settles.',
    statement: 'We believe keeping to the basics is the most classic thing we can do. Good ingredients, baked every day. Beans roasted in-house. A space cared for without a day off.',
    archLabel: 'ARCHITECTURE',
    archTitle: 'A MONOLITH<br>ON THE HILL',
    archKr: 'A black monolith on the hill',
    archBody: 'A black mass, board-formed concrete and a round opening to the sky. The experience begins the moment you start up the ramp.',
    stats: [
      { value: '4', unit: 'FLOORS', label: 'From media art to the rooftop' },
      { value: '1F', unit: 'MEDIA ART', label: 'Media art in a double-height atrium' },
      { value: '3', unit: 'BLENDS', label: 'Three house blends roasted in store' },
      { value: '2H', unit: 'FREE PARKING', label: 'Underground & surface, 2 hours free' },
    ],
    archCaption: 'A round opening to the sky and a board-formed concrete gate',
    floorsLabel: 'FLOOR GUIDE',
    floorsHint: 'Scroll to go up, floor by floor',
    mediaLabel: '1F — MEDIA ART',
    mediaTitle: 'A ground floor made of light',
    mediaBody: 'Art films run across a giant screen cube and a panoramic wall. Ocean, cosmos, colour — each theme turns the whole room into a different scene.',
    mediaNote: 'Media art content changes with the season and theme.',
    themes: [
      { name: 'OCEAN', kr: 'Ocean', image: 'f1-wave' },
      { name: 'COSMOS', kr: 'Cosmos', image: 'f1-cosmos' },
      { name: 'COLOR FIELD', kr: 'Colour', image: 'f1-color' },
      { name: 'DEEP BLUE', kr: 'Deep sea', image: 'f1-wave-wall' },
    ],
    bakeryLabel: 'BAKERY',
    bakeryTitle: 'BAKED<br>DAILY',
    bakeryKr: 'Today’s bread, every morning',
    bakeryBody: 'Baked with care every morning from fine ingredients — from layered croissants to Mont Blancs filled with cream and tarts topped with the season’s fruit.',
    bakeryCaption: 'From dough to oven, made fresh every day',
    showcaseCaption: '2F showcase',
    coffeeLabel: 'COFFEE',
    coffeeTitle: 'ROASTED<br>IN-HOUSE',
    coffeeKr: 'Three blends, roasted in store',
    coffeeBody: 'We roast premium specialty beans in store. Pick the blend that suits you for any coffee — and smell each one before you buy beans to take home.',
    signatureLabel: 'SIGNATURE',
    retail: 'Beans 200g and drip bag sets in store',
    storesLabel: 'STORES',
    storesTitle: 'VISIT<br>BECLASSY',
    storesKr: 'Two places to find us',
  },
};
