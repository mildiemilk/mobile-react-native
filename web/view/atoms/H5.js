import styled from 'styled-components'
import color from '../../static/json/color.json'

export default styled.h5`
    margin: ${props => props.margin? props.margin: '0'};
    line-height: ${props => props.lineHeight? props.lineHeight: 'inherit'};
    color: ${props=>props.color? props.color :color.primary}; 
    ${props => props.left? 'text-align: left;': null};
    ${props => props.center? 'text-align: center;': null};
`