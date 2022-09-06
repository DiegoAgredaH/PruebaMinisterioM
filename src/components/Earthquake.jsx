import React from 'react'

export const Earthquake = ({ title, status, lat, long, prof }) => {

    return (
        <>
            <div className='card ms-3' style={{ marginTop: 10}}>
                <div className='row no-gutters'>
                    <div className='col-md-12'></div>
                    <div className='card-body'>
                        <h5 card-title><b>{title}</b></h5>                        
                        <p card-text>{status}</p>                        
                        <p card-text><b>Lat:</b> {lat} <b>Long: </b>{long}</p>                        
                        <p card-text><b>Prof:</b> {prof}</p>                        
                    </div>
                </div>
            </div>
        </>
    )
}
