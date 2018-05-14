import Router from 'next/router'
import styled from 'styled-components'
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'  
import MenuButton from '../atoms/MenuButton'
import Item from '../atoms/Item'
import menu from '../../static/json/menu.json'
import HeightDiv from '../atoms/HeightDiv'
import { signOut } from '../../lib/handlers/authenticator'
import { Logo } from './HeaderDesktop'

const StylePusher = styled(Sidebar.Pusher)`
margin: 0px !important;
padding:0 !important;
`
const StyleSegment = styled(Segment)`
margin: 0px !important;
padding: 0 !important;
`
const StylePushable =styled(Sidebar.Pushable)`
margin: 0px !important;
padding:0 !important;
`

const MobileLogo = styled(Logo)`
	font-size:190%;
	margin:0;
`

class HeaderMobile extends React.Component{
	constructor(props) {
		super(props);

		this.state = {
			sidebarOpen: false,
			visible: false
		}
	}

	toggleVisibility = () => this.setState({ visible: !this.state.visible })
	sidebarContent = () => 	(
		<div height="100%">
			<MobileLogo>sharemai</MobileLogo>
			<div>
				{this.props.loggedIn
					?	menu.filter(item => ['/login', '/register'].indexOf(item.link) === -1).map( ({link, text}, key) => 
						<Item key={key} onClick={()=>{link==='logout' ? signOut() :Router.push(link) }}>{text}</Item> 
					)
					: menu.slice(0,3).map( ({link, text}, key) => 
						<Item key={key} onClick={()=>Router.push(link)}>{text}</Item>
					)
				}
			</div>
		</div>
	)

	render(){
		const { content, contentMobile } = this.props
		const { visible } = this.state
		return (
			<HeightDiv>
				<MenuButton onClick={this.toggleVisibility}><Icon name='content'/></MenuButton>
				<StylePushable as={Segment}>
					<Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical>
						{this.sidebarContent()}
					</Sidebar>
					<StylePusher>
						<StyleSegment basic>
							{contentMobile || content}
						</StyleSegment>
					</StylePusher>
				</StylePushable>
			</HeightDiv>
		)
	}
}


export default HeaderMobile
