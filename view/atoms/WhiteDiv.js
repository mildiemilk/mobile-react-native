import styled from 'styled-components'

export default styled.div`
    width: 80vw;
    ${props => props.minWidth? `min-width: ${props.minWidth};`: null}
    ${props => props.padding? `padding: ${props.padding};`: null}
    background-color: white;
    z-index:100;
    @media (max-width: 700px) {
        min-width: 500px;
}
`