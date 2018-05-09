import styled from 'styled-components'

export default styled.div`

    ${props => props.minWidth? `min-width: ${props.minWidth};`: null}
    ${props => props.padding? `padding: ${props.padding};`: null}
    cursor: default;
    background-color: white;
    z-index:100;
    @media (max-width: 480px) {
        min-width: auto;
}

@media (min-width: 481px) AND (max-width: 700px) {
        min-width: 320px;
}
`