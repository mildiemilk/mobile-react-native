import Wrapper from '../atoms/Wrapper'
import styled from 'styled-components'
import H1 from '../atoms/H1'
import color from '../../static/json/color.json'
import Link from 'next/link'

export default() => 
<Link href="/productRegister">
	<Wrapper
		hover
		centerAll
		minWidth='320px'
		minHeight='300px'
		bigScreenWidth="max-content">
		<H1>+add item</H1>
	</Wrapper>
</Link>