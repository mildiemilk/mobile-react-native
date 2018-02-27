import { Grid } from 'semantic-ui-react'
import Wrapper from '../atoms/Wrapper'
import Field from '../atoms/TextField'
import Button from '../atoms/Button'
import UserProfile from '../organisms/UserProfile'
import ProfileTable from '../environment/ProfileTable'
import ProfileDetailDisplay from '../organisms/ProfileDetailDisplay'
import JsonTable from '../organisms/JsonTable'
import Modal from '../molecules/Modal'
import Flex from '../atoms/Flex'
import TextField from '../atoms/TextField'

const memberHeader = {
	"name": "Name",
	"email":"Email",
	"shared":"Shared",
	"role":"Role",
	"action":"Action"
}

const productHeader = {
	"name": "Name",
	"owner": "Owner",
	"shared": "Shared",
	"action": "Action"
}

const MemberRegisterForm = props => 
<div>
	{props.passwordconfirmationLength > 5  ?
		props.passwordLength === props.passwordconfirmationLength && props.passwordMatch ?
		null: <h3>Password do not match</h3> : null
	}
	{
		props.member.error?
		<span>{props.member.error}</span>:null
	}
		<span style={{color:'red'}}>{props.member.keyIsValid ? '':'ชื่อต้องใช้ ตัวเลขหรือตัวอักษรภาษาอังกฤษเท่านั้น'}</span>
	<TextField labelFlexStart label="Member Name" name="name"/>
	<TextField labelFlexStart label="Member Password" name="password" type="password"/>
	<TextField labelFlexStart label="Password Confirmation" name="passwordconfirmation" type="password"/>
	<Button fullWidth onClick={()=>props.saveMembership(props.name, props.password, props.user.uid)}>สร้างสมาชิก</Button>
</div>

const MemberLoginForm = props => 
<div>
	{
		props.member.error?
		<span>{props.member.error}</span>:null
	}
	<TextField labelFlexStart label="Member Name" name="name"/>
	<TextField labelFlexStart label="Member Password" name="password" type="password"/>
	<Button fullWidth onClick={()=>props.loginMembership(props.name, props.password, props.user)}>สมัครสมาชิก</Button>	
</div>

export default props => 
	<Grid>
		<Grid.Row>
				<Grid.Column mobile={16} tablet={16} computer={4}>
					<Wrapper>
						<ProfileDetailDisplay
							profileImage={props.profile.profileImage}
							detail={props.detail}
							profile={props.profile}
							balance={props.user.wallet}
							userUid={props.user.uid}
							/>
					</Wrapper>
				</Grid.Column>
				<Grid.Column mobile={16} tablet={16} computer={12}>
					<Flex direction="row">
					<h3>Your Membership:{props.user.membershipId|| 'คุณยังไม่เป็นสมาชิก'}</h3>
						{!props.user.membershipId?
							<Flex direction="row">
								<Modal context={<MemberLoginForm {...props}/>}>
									<Button margin="10px 0 0 0">สมัครสมาชิก</Button>
								</Modal>
								<Modal context={<MemberRegisterForm {...props} />}>
									<Button margin="10px 0 0 10px" onClick={()=>props.saveMembership(props.member.name,props.password,props.user.uid)}>สร้างสมาชิก</Button>
								</Modal>
							</Flex>
							:null
						}
					</Flex>
					<h1>Member</h1>
					<JsonTable headerJson={memberHeader} footer={<tr><td style={{margin:"0", padding:"0"}} colSpan="5"><Button margin="0" fullWidth height="100%">+ add member</Button></td></tr>}/>
					<h1>Products</h1>
					<JsonTable headerJson={productHeader} footer={<tr><td style={{margin:"0", padding:"0"}} colSpan="4"><Button margin="0" fullWidth height="100%">+ add product</Button></td></tr>}/>
				</Grid.Column>
		</Grid.Row>
	</Grid>
