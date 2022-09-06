import React from 'react'

export const Earthquake = (props) => {

    const { title, status, lat, long, prof } = props

    return (
        <>
            <div className='col animate__animated animate__fadeIn'>
                <div className='card'>
                    {/* <div className='card ms-3' style={{ marginTop: 10 }}> */}
                    <div className='row no-gutters'>
                        <div className='col-12'>
                            <div className='card-body'>
                                <h5><b>{title}</b></h5>
                                <p>{status}</p>
                                <p><b>Lat:</b> {lat.toFixed(2)} <b>Long: </b>{long.toFixed(2)}</p>
                                <p><b>Prof:</b> {prof.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
