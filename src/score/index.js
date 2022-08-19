import React, { useEffect, useState } from 'react';
import './Style.css';
import Header from '../header';
import axios from 'axios';
import Loading from '../loading';

const Score = () => {
  const [persons, setPersons] = useState(null);
  const [loading, setLoading] = useState(true);
  const getPersons = async () => {
    await axios
      .post(
        '${xxxx}',
        { table: 'banco' },
        {
          headers: { 'x-api-key': '${xxxx}' },
        },
      )
      .then((result) => {
        setPersons(result.data);
        setLoading(false);
      });
  };
  useEffect(() => {
    getPersons();
    return () => {
      setPersons({});
    };
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <div className="boxScore">{persons && <Table item={persons} />}</div>
    </>
  );
};
const RowTable = ({ item }) => {
  return (
    <div className="row">
      <div className="cell" data-title="Id">
        {item.id}...
      </div>
      <div className="cell" data-title="Nome">
        {item.info.nome}
      </div>
      <div className="cell" data-title="Score">
        {item?.info?.doacoes?.reduce(
          (total, doacao) =>
            total + (doacao.status === 'valido' ? doacao.valor : 0),
          0,
        )}
        pts
      </div>
      <div className="cell" data-title="Em Review">
        {item?.info?.doacoes?.reduce(
          (total, doacao) =>
            total + (doacao.status !== 'valido' ? doacao.valor : 0),
          0,
        )}
        pts
      </div>
      <div className="cell" data-title="Números da Sorte">
        <span className="LuckyNumbers">{item.numeros}</span>
      </div>
    </div>
  );
};
const Table = ({ item }) => {
  return (
    <div className="wrapper">
      <div className="table">
        <div className="row headerTable">
          <div className="cell">Id</div>
          <div className="cell">Nome</div>
          <div className="cell">Score</div>
          <div className="cell">Em Review</div>
          <div className="cell">Números da Sorte</div>
        </div>
        {item?.map((item) => (
          <RowTable key={item.id + item.info.nome} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Score;
