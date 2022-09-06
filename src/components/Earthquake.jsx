import React from 'react'

export const Earthquake = (props) => {

    const { title, status, lat, long, prof } = props

    return (
        <>
            <div className='card ms-3' style={{ marginTop: 10}}>
                <div className='row no-gutters'>
                    <div className='card-body'>
                        <h5><b>{title}</b></h5>                        
                        <p>{status}</p>                        
                        <p><b>Lat:</b> {lat} <b>Long: </b>{long}</p>                        
                        <p><b>Prof:</b> {prof}</p>                        
                    </div>
                </div>
            </div>
        </>
    )
}
