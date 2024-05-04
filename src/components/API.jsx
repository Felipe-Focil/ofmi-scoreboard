import React from 'react';
import { useQuery } from 'react-query';
import * as api from '../utils/ApiFetch.jsx';

const API = () => {
  const links = [
    "https://omegaup.com/arena/OFMI2023DIA2/scoreboard/YKvJVc7qcSZUXFXs6EJCTErTtHREBE",
    "https://omegaup.com/arena/OFMI2023DIA1/scoreboard/Z4aTTx9FW9TBhvptr4dAmGrFkf98M2"
  ];

  const { data, isLoading, isError } = useQuery('data', () => {
    const promises = links.map(link => api.fetchAPI(link));
    return Promise.all(promises);
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;


  console.log(data);
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
};

export default API;
