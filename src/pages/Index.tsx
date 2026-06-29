import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/510c033e-171f-4ce8-bbc1-c9d8d19fe470/bucket/4c9aa22c-f7c5-48a9-800b-b64ade80a01c.jpg';

const NAV = [
  { id: 'about', label: 'О салоне' },
  { id: 'services', label: 'Услуги' },
  { id: 'price', label: 'Прайс' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

const REVIEWS = [
  { name: 'Анастасия К.', service: 'Окрашивание', text: 'Наконец-то нашла своего колориста! Результат превзошёл ожидания — цвет получился именно таким, как я хотела. Буду возвращаться снова.', stars: 5 },
  { name: 'Марина Л.', service: 'Маникюр и педикюр', text: 'Очень аккуратный мастер, покрытие держится уже третью неделю. Приятная атмосфера в салоне, всё чисто и стильно.', stars: 5 },
  { name: 'Екатерина В.', service: 'Наращивание ресниц', text: 'Делала наращивание 2D — выгляжу шикарно! Мастер всё объяснила, подобрала длину и изгиб под форму глаз. Рекомендую!', stars: 5 },
  { name: 'Ольга Д.', service: 'Кератиновое выпрямление', text: 'Сделала кератин впервые — это чудо! Волосы гладкие, блестящие, укладка занимает 5 минут. Спасибо мастерам «Малины».', stars: 5 },
  { name: 'Юлия Т.', service: 'Перманентный макияж бровей', text: 'Боялась перманента, но мастер развеяла все страхи. Брови получились натуральные и красивые. Очень довольна результатом!', stars: 5 },
  { name: 'Светлана М.', service: 'Лазерная эпиляция', text: 'Хожу на лазер уже 4 сеанса — результат заметен после второго. Процедура почти безболезненная, мастер внимательная.', stars: 5 },
];

const SERVICES = [
  { icon: 'Scissors', title: 'Уход за волосами', desc: 'Ботокс, кератин, биксипластия — восстановление и зеркальный блеск.' },
  { icon: 'Palette', title: 'Стрижки и колористика', desc: 'Окрашивания и стрижки любой сложности от топ-мастеров.' },
  { icon: 'Sparkles', title: 'Ногтевой сервис', desc: 'Аппаратный маникюр и педикюр, стойкое покрытие, дизайн.' },
  { icon: 'Zap', title: 'Лазерная эпиляция', desc: 'Аппаратная косметология. Гладкость кожи на месяцы вперёд.' },
  { icon: 'Eye', title: 'Взгляд · Lash & Brow', desc: 'Наращивание и ламинирование ресниц, коррекция бровей.' },
  { icon: 'PenTool', title: 'Перманентный макияж', desc: 'Брови и губы — естественно и надолго.' },
  { icon: 'Hand', title: 'Массаж тела', desc: 'Расслабляющий и моделирующий уход для тела.' },
];

const PRICE: { group: string; items: { name: string; price: string; promo?: boolean }[] }[] = [
  {
    group: 'Уход за волосами',
    items: [
      { name: 'Ботокс для волос', price: 'от 5 000 ₽' },
      { name: 'Кератиновое выпрямление', price: 'от 6 000 ₽' },
      { name: 'Биксипластия', price: 'от 7 000 ₽' },
      { name: 'Холодное восстановление', price: 'от 3 000 ₽' },
      { name: 'Запаивание кончиков', price: 'от 2 000 ₽' },
      { name: 'Пилинг кожи головы', price: '1 500 ₽' },
      { name: 'Снятие дредов', price: '5 000 ₽' },
      { name: 'Снятие наращенных волос', price: '35 ₽ за прядь' },
      { name: 'Долговременный уход', price: 'от 3 500 ₽' },
    ],
  },
  {
    group: 'Стрижки и колористика',
    items: [
      { name: 'Женская стрижка', price: 'от 1 000 ₽' },
      { name: 'Каскад', price: '2 500 ₽' },
      { name: 'Стрижка чёлки', price: '500 ₽' },
      { name: 'Окрашивание в один тон', price: 'от 4 000 ₽' },
      { name: 'Окрашивание корней', price: 'от 3 500 ₽' },
      { name: 'Мелирование', price: 'от 7 000 ₽' },
      { name: 'Тотал блонд', price: 'от 10 000 ₽' },
      { name: 'Сложное окрашивание', price: 'от 8 000 ₽' },
    ],
  },
  {
    group: 'Ногтевой сервис',
    items: [
      { name: 'Ремонт ногтя', price: '100 ₽' },
      { name: 'Дизайн (за ноготь)', price: 'от 100 ₽' },
      { name: 'Маникюр без покрытия', price: '1 400 ₽' },
      { name: 'Маникюр с покрытием', price: '2 500 ₽' },
      { name: 'Педикюр с покрытием', price: 'от 2 500 ₽' },
      { name: 'Коррекция наращенных ногтей', price: '3 000 ₽' },
      { name: 'Наращивание ногтей', price: '3 600 ₽' },
      { name: 'Френч', price: '+500 ₽' },
    ],
  },
  {
    group: 'Аппаратная косметология',
    items: [
      { name: 'Лазерная эпиляция · подмышечные впадины', price: 'от 900 ₽' },
      { name: 'Лазерная эпиляция · голени', price: '1 500 ₽' },
      { name: 'Лазерная эпиляция · всё тело', price: '7 000 ₽' },
      { name: 'Лазерная эпиляция · всё тело (первое посещение)', price: '3 900 ₽', promo: true },
    ],
  },
  {
    group: 'Взгляд · Lash & Brow',
    items: [
      { name: 'Удаление волос на лице воском', price: 'от 500 ₽' },
      { name: 'Коррекция и окрашивание бровей', price: '1 500 ₽' },
      { name: 'Ламинирование ресниц', price: 'от 2 300 ₽' },
      { name: 'Долговременная укладка бровей', price: 'от 2 300 ₽' },
      { name: 'Наращивание ресниц 1D', price: '2 500 ₽' },
      { name: 'Наращивание ресниц 2D', price: '2 700 ₽' },
      { name: 'Наращивание ресниц 3D', price: '3 000 ₽' },
    ],
  },
  {
    group: 'Перманентный макияж',
    items: [
      { name: 'Перманент бровей', price: '9 500 ₽' },
      { name: 'Перманент губ', price: '9 500 ₽' },
    ],
  },
  {
    group: 'Тело',
    items: [
      { name: 'Расслабляющий массаж (60 мин)', price: 'от 3 000 ₽' },
      { name: 'Моделирующий массаж (60 мин)', price: 'от 3 500 ₽' },
    ],
  },
];

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <button onClick={() => scrollTo('hero')} className="flex items-baseline gap-1.5 min-h-[44px] min-w-[44px]">
            <span className="font-display text-2xl sm:text-3xl font-semibold text-primary leading-none">Малина</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:inline">территория красоты</span>
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-foreground/70 hover:text-primary transition-colors py-2">
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href="tel:+79895958645" className="sm:hidden flex items-center justify-center min-h-[44px] min-w-[44px] text-primary" aria-label="Позвонить">
              <Icon name="Phone" size={22} />
            </a>
            <Button size="sm" className="hidden sm:inline-flex rounded-full px-5" asChild>
              <a href="https://n1300562.yclients.com/company/1185807/personal/select-services?o=" target="_blank" rel="noopener noreferrer">Записаться</a>
            </Button>
            <button className="md:hidden p-3 min-h-[44px] min-w-[44px] flex items-center justify-center" onClick={() => setMenuOpen((v) => !v)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-border bg-background px-6 py-5 flex flex-col gap-1 animate-fade-in safe-bottom">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-foreground/80 py-3 text-base min-h-[44px] border-b border-border/40 last:border-0">
                {n.label}
              </button>
            ))}
            <div className="pt-3">
              <Button className="rounded-full w-full" asChild>
                <a href="https://n1300562.yclients.com/company/1185807/personal/select-services?o=" target="_blank" rel="noopener noreferrer">Записаться онлайн</a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-16 min-h-[100svh] sm:min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Интерьер салона Малина" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-background via-background/90 sm:via-background/85 to-background/60 sm:to-background/20" />
        </div>
        <div className="container relative z-10 py-16 sm:py-20">
          <div className="max-w-2xl fade-up">
            <p className="text-primary uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs mb-5 sm:mb-6">ЖК «Алхимово» · ул. Уточкина 8к2</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold leading-[1.05] text-balance mb-5 sm:mb-6">
              Эстетика, уход и&nbsp;настоящий профессионализм
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-lg mb-8 sm:mb-9">
              Современное бьюти-пространство в шаговой доступности. Волосы, ногти, взгляд, тело — доверьте красоту мастерам «Малины».
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap gap-3">
              <Button size="lg" className="rounded-full px-8 h-12 text-base w-full xs:w-auto" asChild>
                <a href="https://n1300562.yclients.com/company/1185807/personal/select-services?o=" target="_blank" rel="noopener noreferrer">Записаться онлайн</a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-primary/40 text-primary hover:bg-accent w-full xs:w-auto" onClick={() => scrollTo('price')}>
                Смотреть прайс
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About / UTP */}
      <section id="about" className="py-16 sm:py-24 container">
        <div className="grid sm:grid-cols-3 gap-8 sm:gap-10">
          {[
            { icon: 'Gem', title: 'Премиум-материалы', desc: 'Работаем только на профессиональной косметике проверенных брендов.' },
            { icon: 'HeartHandshake', title: 'Индивидуальный подход', desc: 'Подбираем уход под ваш тип кожи, волос и образ жизни.' },
            { icon: 'MapPin', title: 'Рядом с домом', desc: 'Прямо в ЖК «Алхимово» — без пробок и долгой дороги.' },
          ].map((u, i) => (
            <div key={u.title} className="fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary mb-5">
                <Icon name={u.icon} size={22} />
              </div>
              <h3 className="font-display text-2xl mb-2">{u.title}</h3>
              <p className="text-muted-foreground">{u.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 sm:py-24 bg-secondary/50 border-y border-border">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">Что мы делаем</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">Наши услуги</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {SERVICES.map((s) => (
              <div key={s.title} className="group bg-card rounded-lg p-7 border border-border hover:border-primary/40 hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon name={s.icon} size={20} />
                </div>
                <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price */}
      <section id="price" className="py-16 sm:py-24 container">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">Стоимость</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold mb-3">Полный прайс-лист</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Финальная стоимость зависит от длины волос и сложности. Уточните цену под вашу задачу.</p>
        </div>
        <div className="max-w-3xl mx-auto grid gap-8 sm:gap-10">
          {PRICE.map((block) => (
            <div key={block.group}>
              <h3 className="font-display text-xl sm:text-2xl text-primary mb-3 sm:mb-4 pb-2 border-b border-border">{block.group}</h3>
              <ul className="divide-y divide-border">
                {block.items.map((it) => (
                  <li key={it.name} className={`flex items-center justify-between gap-2 py-3 ${it.promo ? 'bg-accent/60 -mx-3 px-3 rounded-lg' : ''}`}>
                    <span className={`text-sm sm:text-base flex items-center gap-2 ${it.promo ? 'font-medium' : ''}`}>
                      {it.name}
                      {it.promo && <span className="inline-block text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full leading-none">Акция</span>}
                    </span>
                    <span className="flex-1 border-b border-dotted border-border/70 min-w-[16px] mx-1" />
                    <span className={`font-semibold whitespace-nowrap text-sm sm:text-base ${it.promo ? 'text-primary' : ''}`}>{it.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full px-8 h-12" asChild>
            <a href="https://n1300562.yclients.com/company/1185807/personal/select-services?o=" target="_blank" rel="noopener noreferrer">Узнать точную стоимость</a>
          </Button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-16 sm:py-24 bg-secondary/50 border-y border-border">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <p className="text-primary uppercase tracking-[0.3em] text-xs mb-4">Мнения клиентов</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold">Отзывы посетителей</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-card rounded-lg p-7 border border-border flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed flex-1">«{r.text}»</p>
                <div>
                  <p className="font-medium text-sm">{r.name}</p>
                  <p className="text-muted-foreground text-xs">{r.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking + Contacts */}
      <section id="booking" className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="container grid lg:grid-cols-2 gap-10 sm:gap-14 items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-5">Записаться в «Малину»</h2>
            <p className="text-primary-foreground/80 mb-6 sm:mb-8 max-w-md text-sm sm:text-base">
              Выберите удобное время онлайн или напишите нам в мессенджер — подберём мастера и ответим на вопросы.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button size="lg" variant="secondary" className="rounded-full px-7 h-12 w-full sm:w-auto" asChild>
                <a href="https://n1300562.yclients.com/company/1185807/personal/select-services?o=" target="_blank" rel="noopener noreferrer">
                  <Icon name="CalendarCheck" size={18} className="mr-2" /> Онлайн-запись
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full px-7 h-12 bg-[#25D366] hover:bg-[#1ebe5d] text-white w-full sm:w-auto" asChild>
                <a href="https://max.ru/u/f9LHodD0cOLD2C_9hVQ2DrmFFL0U7dlmy2BNNFQb8eBlFrcfnmf2Le5Mrqk" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" size={18} className="mr-2" /> Макс / ВКонтакте
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="rounded-full px-7 h-12 bg-[#229ED9] hover:bg-[#1d8cc2] text-white w-full sm:w-auto" asChild>
                <a href="https://t.me/malinaTerritoryOfBeautyy" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" size={18} className="mr-2" /> Telegram
                </a>
              </Button>
            </div>
          </div>
          <div id="contacts" className="bg-background text-foreground rounded-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-3xl mb-6">Контакты</h3>
              <ul className="space-y-5">
                <li className="flex gap-4">
                  <Icon name="MapPin" className="text-primary shrink-0 mt-1" size={20} />
                  <div><p className="font-medium">Адрес</p><p className="text-muted-foreground">Москва, ЖК «Алхимово», ул. Уточкина, д. 8, к. 2</p></div>
                </li>
                <li className="flex gap-4">
                  <Icon name="Clock" className="text-primary shrink-0 mt-1" size={20} />
                  <div><p className="font-medium">Режим работы</p><p className="text-muted-foreground">Ежедневно с 10:00 до 21:00</p></div>
                </li>
                <li className="flex gap-4">
                  <Icon name="Phone" className="text-primary shrink-0 mt-1" size={20} />
                  <div><p className="font-medium">Телефон</p><a href="tel:+79895958645" className="text-muted-foreground hover:text-primary transition-colors">+7 (989) 595-86-45</a></div>
                </li>
                <li className="flex gap-4">
                  <Icon name="Send" className="text-primary shrink-0 mt-1" size={20} />
                  <div><p className="font-medium">Telegram</p><a href="https://t.me/malinaTerritoryOfBeautyy" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">@malinaTerritoryOfBeautyy</a></div>
                </li>
                <li className="flex gap-4">
                  <Icon name="MessageSquare" className="text-primary shrink-0 mt-1" size={20} />
                  <div><p className="font-medium">ВКонтакте / Макс</p><a href="https://max.ru/u/f9LHodD0cOLD2C_9hVQ2DrmFFL0U7dlmy2BNNFQb8eBlFrcfnmf2Le5Mrqk" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Написать нам</a></div>
                </li>
              </ul>
              <a
                href="https://yandex.ru/maps/?rtext=~55.572422,37.363076&rtt=auto"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 h-11 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Icon name="Navigation" size={16} /> Как добраться
              </a>
            </div>
            <div className="w-full h-52 sm:h-64">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.363076%2C55.572422&z=16&pt=37.363076%2C55.572422%2Cpm2rdm~37.363076%2C55.572422%2Cpm2rdl&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB.%20%D0%A3%D1%82%D0%BE%D1%87%D0%BA%D0%B8%D0%BD%D0%B0%2C%208%D0%BA2%20%D0%A1%D0%B0%D0%BB%D0%BE%D0%BD%20%D0%9C%D0%90%D0%9B%D0%98%D0%9D%D0%90"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта — Салон красоты Малина"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
        <div className="w-full h-56 sm:h-72">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.363076%2C55.572422&z=16&pt=37.363076%2C55.572422%2Cpm2rdm&text=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D1%83%D0%BB.%20%D0%A3%D1%82%D0%BE%D1%87%D0%BA%D0%B8%D0%BD%D0%B0%2C%208%D0%BA2%20%D0%A1%D0%B0%D0%BB%D0%BE%D0%BD%20%D0%9C%D0%90%D0%9B%D0%98%D0%9D%D0%90"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Карта в футере — Салон красоты Малина"
            style={{ border: 0, filter: 'grayscale(20%)' }}
            allowFullScreen
          />
        </div>
        <div className="container py-10 flex flex-col sm:flex-row justify-between gap-6 items-start">
          <div>
            <p className="font-display text-3xl font-semibold mb-2">Малина</p>
            <p className="text-background/60 text-sm max-w-xs">Территория красоты в ЖК «Алхимово». Уход, эстетика и забота о вас.</p>
          </div>
          <div className="text-sm text-background/60 space-y-1">
            <p>Москва, ул. Уточкина, 8к2</p>
            <p>Ежедневно 10:00–21:00</p>
            <a href="tel:+79895958645" className="block hover:text-background transition-colors">+7 (989) 595-86-45</a>
            <a
              href="https://yandex.ru/maps/?rtext=~55.572422,37.363076&rtt=auto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-background/80 hover:text-background transition-colors"
            >
              <Icon name="Navigation" size={14} /> Как добраться
            </a>
            <p className="mt-4">© {new Date().getFullYear()} Салон красоты «Малина»</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;