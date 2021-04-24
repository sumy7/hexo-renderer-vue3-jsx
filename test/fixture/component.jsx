'use strict'

import {defineComponent} from "vue"

module.exports = defineComponent({
    props: ['content'],
    setup(props) {
    },
    render(props) {
        return (
            <p>{props.content}</p>
        )
    }
})
