'use strict'

import Component from './component.jsx'

module.exports = (props) => {
    return (
        <html>
        <h1>{props.title}</h1>
        <Component content={props.content}/>
        </html>
    )
}
