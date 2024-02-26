import { useEffect, useState } from "react";

export function useSerieslist() {
    const url = 'http://localhost:5026/api/Series/Serieslist';

    const [data, setData] = useState();
    const [idSeries, setIdSeries] = useState([]);

    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                //console.log('data:', data)
                setData(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        //console.log('Data in second effect:', data);
        if (data !== undefined && Array.isArray(data.response) && data.response.length > 0) {
            const newIdSeries = data.response
                .filter(serie => serie.idSerie !== undefined && serie.idSerie !== null)
                .map(serie => serie.idSerie);
            setIdSeries(newIdSeries);
          //  console.log('idSeries:', newIdSeries);asd
        }
    }, [data]);
    
    // console.log('idSerie:',idSeries) // No es necesario imprimirlo aquí

    return { data, idSeries };
}
