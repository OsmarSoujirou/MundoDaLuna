/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Style.css';

const Person = ({ item }) => {
  return item?.info?.doacoes?.map((doacao) =>
    doacao?.recadinho ? (
      <li className="personBox" key={doacao.dataHora}>
        <a>
          <div className="personDonation">
            <h2 className="personName">
              {item.info.nome}
            </h2>
            <p className="personMessage">{doacao.recadinho}</p>
            <div className="personDate">{doacao.dataHora}</div>
          </div>
        </a>
      </li>
    ) : (
      ''
    ),
  );
};

export default Person;
