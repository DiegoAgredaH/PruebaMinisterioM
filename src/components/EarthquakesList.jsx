import { Paper, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { Earthquake } from './Earthquake';

const ITEMS_PER_PAGE = 19;

export const EarthquakesList = () => {


    const { data, loading } = useFetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    const [filteredData, setFilteredData] = useState([])
    const [term, setTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(0)

    const [items, setItems] = useState([])

    // filtrado de datos
    useEffect(() => {
        if (!loading) {
            let filtered = data.filter(earthquake =>
                earthquake.geometry.coordinates[0] >= -160
                && earthquake.geometry.coordinates[0] <= -30
                && earthquake.geometry.coordinates[1] >= -50
                && earthquake.geometry.coordinates[1] <= 50
                && earthquake.geometry.coordinates[2] >= 1
                && earthquake.geometry.coordinates[2] <= 400

            )
            setFilteredData(filtered)
            setItems([...filtered].splice(0, ITEMS_PER_PAGE))
        }
    }, [loading]);

    const searchingTerm = (term) => (x => {
        const termLower = term.toLowerCase()
        const xLower = x.properties.place.toLowerCase()
        return xLower.includes(termLower) || !termLower;
    })

    const prevHandler = () => {
        const prevPage = currentPage -1;

        if (prevPage < 0) return;

        const firstIndex = prevPage * ITEMS_PER_PAGE

        setItems([...filteredData].splice(firstIndex, ITEMS_PER_PAGE))
        setCurrentPage(prevPage)

    }
    
    const nextHandler = () => {
        const allEarthquakes = filteredData.length;
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * ITEMS_PER_PAGE

        if (firstIndex === allEarthquakes) return;
        setItems([...filteredData].splice(firstIndex, ITEMS_PER_PAGE))
        setCurrentPage(nextPage)
    }


    return (
        <>
            {
                loading
                    ? (
                        <div className='alert alert-info text-center'>
                            Cargando sismos ...
                        </div>

                    )
                    : (
                        <Paper className='container'>

                                <br />
                                <TextField style={{ margin: 10}} id="outlined-search" label="Buscar por titulo" type="search" variant="outlined"
                                    onChange={(e) => setTerm(e.target.value)}></TextField>
                                <br /><br />


                            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 g-3 animate__animated animate__fadeIn'>
                                {
                                    items.filter(searchingTerm(term)).map((earthquake, i) => (
                                        <Earthquake
                                            key={i}
                                            title={earthquake.properties.title}
                                            status={earthquake.properties.status}
                                            lat={earthquake.geometry.coordinates[0]}
                                            long={earthquake.geometry.coordinates[1]}
                                            prof={earthquake.geometry.coordinates[2]}

                                        />

                                    ))
                                }
                            </div>
                            <br/>
                            <Button onClick={() => prevHandler()} variant="outlined">Anterior</Button>
                            <Button onClick={() => nextHandler()}variant="outlined">Siguiente</Button>
                        </Paper>
                    )
            }
        </>

    )
}
