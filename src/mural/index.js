import React, { useEffect, useState } from 'react';
import './Style.css';
import Header from '../header';
import Person from '../components/person';
import axios from 'axios';
import Loading from '../loading';

const Mural = () => {
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
      <div className="boxMural">
        <ul className="ulSticky">
          {persons?.map((item) => (
            <Person key={item.id + item.info.nome} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Mural;
