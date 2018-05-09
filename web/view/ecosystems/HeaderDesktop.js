import Router from 'next/router'
import MediaQuery from 'react-responsive'
import Nav from '../atoms/Nav'
import Menu from '../atoms/Menu'
import Item from '../atoms/Item'
import menu from '../../static/json/menu.json'
import { signOut } from '../../lib/handlers/authenticator'
import styled from 'styled-components'

export const Logo = styled.h1`
font-family: 'Roboto', sans-serif;
font-weight:500;
font-size:400%;
color:#FF3730;
padding:10px 15px;
border: 5px solid #FF3730 ;
margin-left:10px;
margin-bottom:0;
`

export default ({loggedIn, content}) => <div>
<Menu>
	<Logo>sharemai</Logo>
	{loggedIn
	?	menu.filter(item => ['/login', '/register'].indexOf(item.link) === -1).map( ({link, text}, key) => 
		<Item key={key} onClick={()=>{link==='logout' ? signOut() :Router.push(link) }}>{text}</Item> 
	)
	: menu.slice(0,3).map( ({link, text}, key) => 
		<Item key={key} onClick={()=>Router.push(link)}>{text}</Item>
	)
	}
</Menu>
<div>{content}</div>
</div>