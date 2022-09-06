import { Paper, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { Earthquake } from './Earthquake';

export const EarthquakesList = () => {

    const { data, loading } = useFetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson');
    const [filteredData, setFilteredData] = useState([])
    const [term, setTerm] = useState('');


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
        }
    }, [loading]);

    const searchingTerm = (term) => (x => {
        const termLower = term.toLowerCase()
        const xLower = x.properties.place.toLowerCase()
        return xLower.includes(termLower) || !termLower;
    })




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
                        <Paper>

                            <Paper >
                                <br />
                                <TextField style={{ margin: 10}} id="outlined-search" label="Buscar por titulo" type="search" variant="outlined"
                                    onChange={(e) => setTerm(e.target.value)}></TextField>
                                <br /><br />

                            </Paper>

                            <div className='card-columns'>
                                {
                                    filteredData.filter(searchingTerm(term)).map((earthquake, i) => (
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
                        </Paper>
                    )
            }
        </>

    )
}
