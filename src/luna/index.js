import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { useCookies } from 'react-cookie';
import { useSearchParams } from "react-router-dom";
import Card from '../card';
import Checkout from '../checkout';
import './Style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, EffectCards } from 'swiper';
import 'swiper/css';
import Header from '../header';

const search = window.location.search;
const params = new URLSearchParams(search);
const finished = params.get('finished');

function Luna() {
  const [cookies, setCookie] = useCookies(['luna']);
  var dataBase = new Date(2021, 9, 12);
  var dataHoje = new Date();
  var dataFim = new Date(2022, 6, 19);
  var difData = (dataHoje - dataBase) / (1000 * 3600 * 24) / 7;
  var difDataMes = (dataFim - dataHoje) / (1000 * 3600 * 24) / 31.11111;
  var nome = cookies?.nome
    ? cookies.nome.split(' ').slice(0, 1).join('') + ', '
    : '';

  var falasIniciais = [
    { texto: 'Oiii eu sou a Luna! 😊 ', tempo: 2000, id: 1 },
    {
      texto:
        'Hoje eu tô com ' +
        difData.toString().substring(2, 0) +
        ' semanas, faltam ' +
        difDataMes.toString().substring(1, 0) +
        '⌛ meses para eu sair da barriga da mamãe.',
      tempo: 2500,
      id: 2,
    },
    {
      texto:
        'Meu papai e mamãe estão muito ansiosos pela minha chegada e querem fazer algo especial',
      tempo: 2000,
      id: 4,
    },
    {
      texto: 'eles decidiram fazer um chá de bebê diferente. 😜',
      tempo: 2000,
      id: 6,
    },
    {
      texto:
        'Participando você pode ajudar a mamãe e o papai a se prepararem para a minha chegada.',
      tempo: 2000,
      id: 7,
    },
    { texto: 'Vai ser tipo um joguinho... \n🎲👾', tempo: 2000, id: 8 },
    {
      texto: "Nesse 'game' você pode escolher um dos itens acima. ⬆️⬆️",
      tempo: 3000,
      id: 9,
    },
    {
      texto: 'Arrastando para o lado você consegue ver todas as cartas. \n ↔️',
      tempo: 3000,
      id: 10,
    },
    {
      texto:
        'Cada item tem um valor que gera uma quantidade diferente de pontos',
      tempo: 2000,
      id: 11,
    },
    {
      texto: 'quanto mais pontos maiores são suas chances de ganhar. 🏆',
      tempo: 2000,
      id: 12,
    },
    {
      texto:
        'Quando eu estiver pertinho de chegar, o papai vai sortear 3 ganhadores.',
      tempo: 2000,
      id: 13,
    },
    {
      texto: '🥇Pix    R$ 150,00\n🥈Pix    R$  50,00\n🥉Ifood  R$  30,00',
      tempo: 6000,
      id: 14,
    },
    { texto: 'Eu to torcendo por você!\n🤩🤞🏻 ', tempo: 10000, id: 15 },
    { texto: '..................', tempo: 4000, id: 16 },
    {
      texto: 'Ei gostou do meu manto de hokage? 🥷🏻 \nfoi o papai que fez 😜',
      tempo: 8000,
      id: 17,
    },
    { texto: '.....................', tempo: 6000, id: 18 },
    {
      texto:
        'Deixa eu te apresentar minha miga, essa ao meu lado é a kurama! 🦊',
      tempo: 8000,
      id: 19,
    },
    { texto: '.........................', tempo: 4000, id: 20 },
    {
      texto:
        'A mamãe disse que vou ser a cara dela, o papai falou que já basta uma 😹😹',
      tempo: 5000,
      id: 21,
    },
    { texto: '.........................', tempo: 4000, id: 22 },
  ];
  var falasConhecido = [
    {
      texto: 'Oiii ' + nome + 'que legal você voltou! 😊 ',
      tempo: 2000,
      id: 1,
    },
    {
      texto:
        'Hoje eu tô com ' +
        difData.toString().substring(2, 0) +
        ' semanas, faltam ' +
        difDataMes.toString().substring(1, 0) +
        '⌛ meses para eu sair da barriga da mamãe.',
      tempo: 2500,
      id: 2,
    },
    {
      texto: ".....vamos continuar nosso 'game' ? ⬆️⬆️",
      tempo: 3000,
      id: 9,
    },
    {
      texto: 'Arrastando para o lado você consegue ver todas as cartas. \n ↔️',
      tempo: 3000,
      id: 10,
    },
    {
      texto:
        'Cada item tem um valor que gera uma quantidade diferente de pontos',
      tempo: 2000,
      id: 11,
    },
    {
      texto: 'quanto mais pontos maiores são suas chances de ganhar. 🏆',
      tempo: 2000,
      id: 12,
    },
    {
      texto:
        'Quando eu estiver pertinho de chegar, o papai vai sortear 3 ganhadores.',
      tempo: 2000,
      id: 13,
    },
    {
      texto: '🥇Pix    R$ 150,00\n🥈Pix    R$  50,00\n🥉Ifood  R$  30,00',
      tempo: 6000,
      id: 14,
    },
    { texto: 'Eu to torcendo por você!\n🤩🤞🏻 ', tempo: 10000, id: 15 },
    { texto: '..................', tempo: 4000, id: 16 },
    {
      texto: 'Ei gostou do meu manto de hokage? 🥷🏻 \nfoi o papai que fez 😜',
      tempo: 8000,
      id: 17,
    },
    { texto: '.....................', tempo: 6000, id: 18 },
    {
      texto:
        'Deixa eu te apresentar minha miga, essa ao meu lado é a kurama! 🦊',
      tempo: 8000,
      id: 19,
    },
    { texto: '.........................', tempo: 4000, id: 20 },
    {
      texto:
        'A mamãe disse que vou ser a cara dela, o papai falou que já basta uma 😹😹',
      tempo: 5000,
      id: 21,
    },
    { texto: '.........................', tempo: 4000, id: 22 },
  ];
  var falaAgradecimento = [
    {
      texto: 'Muito obrigada por participar!!😊 ',
      tempo: 3000,
      id: 1,
    },
    {
      texto: 'Você já tem seus pontos e já está participando do sorteio.',
      tempo: 3000,
      id: 2,
    },
    {
      texto: 'O papai só vai conferir tudo para te incluir na tabelinha de pontos.',
      tempo: 5000,
      id: 3,
    }   
  ]
  var falas = finished  !== null ? falaAgradecimento : (cookies?.skip ? falasConhecido : falasIniciais);

  const cartas = [
    {
      title: 'Fralda Small',
      text: 'Uma vez ativado esse item concede proteção contra ataque surpresas.',
      pts: 12,
      type: 'Normal',
      id: 'fralda',
      link: 'https://mpago.la/11Z6ZFw',
      qrCode:
        '00020126490014BR.GOV.BCB.PIX0111067312573460212Fralda Small520400005303986540512.005802BR5925Osmar Araujo Borges Junio6009SAO PAULO61080540900062110507ChaRifa6304ADE5',
    },
    {
      title: 'Roupa Ninja',
      text: 'Quando ativado esse item libera um ninjutsu que deixa todos ao redor apaixonados.',
      pts: 25,
      type: 'Normal',
      id: 'roupa_ninja',
      link: 'https://mpago.la/1K96Por',
      qrCode:
        '00020126480014BR.GOV.BCB.PIX0111067312573460211Roupa Ninja520400005303986540525.005802BR5925Osmar Araujo Borges Junio6009SAO PAULO61080540900062110507ChaRifa6304C924',
    },
    {
      title: 'Fralda Strong',
      text: 'Uma vez ativado tem o poder de mega proteção contra ataques duradouros.',
      pts: 42,
      type: 'Normal',
      id: 'fralda_strong',
      link: 'https://mpago.la/2tewey7',
      qrCode:
        '00020126500014BR.GOV.BCB.PIX0111067312573460213Fralda Strong520400005303986540542.005802BR5925Osmar Araujo Borges Junio6009SAO PAULO61080540900062110507ChaRifa63042A3D',
    },
    {
      title: 'Pet Pelúcia',
      text: 'Animal de defesa e proteção contra monstros noturnos.',
      pts: 65,
      type: 'Rose',
      id: 'pet_pelucia',
      link: 'https://mpago.la/1b9dLTq',
      qrCode:
        '00020126480014BR.GOV.BCB.PIX0111067312573460211Pet Pelucia520400005303986540565.005802BR5925Osmar Araujo Borges Junio6009SAO PAULO61080540900062110507ChaRifa63042C65',
    },
    {
      title: 'Mamadeira Arcana',
      text: 'Quando ativado esse item recupera força e energia.',
      pts: 85,
      type: 'Rose',
      id: 'mamadeira_arcana',
      link: 'https://mpago.la/2qB41tF',
      qrCode:
        '00020126530014BR.GOV.BCB.PIX0111067312573460216Mamadeira Arcana520400005303986540585.005802BR5925Osmar Araujo Borges Junio6009SAO PAULO61080540900062110507ChaRifa63048E01',
    },
    {
      title: '[Item Misterioso]',
      text: 'Essa carta reflete um poder que só você pode mensurar.',
      pts: '??',
      type: 'Gold',
      id: '__',
      qrCode:
        '00020126520014BR.GOV.BCB.PIX0111067312573460215Item Misterioso5204000053039865802BR5925Osmar Araujo Borges Junio6009SAO PAULO61080540900062110507ChaRifa630434FB',
    },
  ];
  var position = 0;
  var array = falas[position].texto.split('');
  var timer;
  var [text, setText] = useState(' ');
  var [cardClass, setCardClass] = useState('');
  var [cardActive, setCardActive] = useState('');
  var [checkoutActive, setCheckoutActive] = useState(false);
  var [itemSelect, setItemSelect] = useState('');
  const [playClick] = useSound(
    '/Assets/button-30.mp3',
    { volume: 0.25 }
  );
  const [playSwitch] = useSound(
    '/Assets/switch-off.mp3',
    { volume: 0.25 }
  );
  const frameLooper = (old) => {
    if (array.length > 0) {
      const imcomple = old + array.shift();
      setText(imcomple);
      timer = setTimeout(() => {
        frameLooper(imcomple);
      }, 50);
    } else {
      if (falas[position].id === 9) {
        setCardClass('active');

        if (!cookies?.skip)
          setCookie('skip', true, {
            path: '/',
            expires: new Date('Sun, 16 Jul 3567 06:23:41 GMT'),
          });
        setTimeout(() => {
          scroll();
        }, 1000);
      }

      if (position < falas.length - 1) {
        timer = setTimeout(() => {
          frameLooper('');
        }, falas[position].tempo);
        ++position;
        array = falas[position].texto.split('');
      } else {
        clearTimeout(timer);
      }
    }
  };
  const scroll = () => {
    document?.getElementById('dialog')?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    setTimeout(() => {
      frameLooper('');
    }, 1000);
    return () => {
      setText({});
      setCardClass({});
      setCardActive({});
      setCheckoutActive({});
      setItemSelect({});
    };
  }, []);

  return (
    <>
      <input
        type="checkbox"
        id="drawer-toggle"
        name="drawer-toggle"
        checked={checkoutActive}
        onChange={() => setCheckoutActive(!checkoutActive)}
      />
      <Checkout
        item={itemSelect}
        back={() => {setCheckoutActive(!checkoutActive); playSwitch(); }}
      />
      <Header />
      <div className="luna">
        <div></div>
        <div className={'interactive interactive' + cardClass}>
          <Swiper
            effect={'cards'}
            mousewheel={true}
            grabCursor={false}
            keyboard={{
              enabled: true,
            }}
            modules={[Keyboard, Mousewheel, EffectCards]}
            className={'mySwiper cards' + cardClass}
          >
            {cartas.map((card) => {
              return (
                <SwiperSlide key={card.id}>
                  <span
                    onClick={() => {
                      playClick();
                      if (cardClass) {
                        setCardActive(card.id);
                        setCheckoutActive(true);
                        setItemSelect(card);
                      }
                    }}
                  >
                    <Card
                      title={card.title}
                      text={card.text}
                      pts={card.pts}
                      type={card.type}
                      id={card.id}
                      activated={cardActive === card.id ? 'cardActivated' : ''}
                    />
                  </span>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div></div>
        <div className="dialog" id="dialog">
          <img
            src="./Assets/luna-e-kurama.png"
            className="img-luna"
            alt="logo"
          />
          <div className="text">
            <span className="arrow" />
            <div className="bubble">{text}</div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default Luna;
