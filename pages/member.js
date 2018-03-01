import React from 'react'
import { reduxForm, formValueSelector } from 'redux-form'
import withRedux from "next-redux-wrapper"
import store from '../lib/store'
import MemberView from '../view/environment/Member'
import LoginForm from '../view/environment/AuthForm'
import { signinWithFacebook, signinWithGoogle, signOut, signInWithEmail} from '../lib/handlers/authenticator'
import { getProfile } from '../lib/handlers/profile'
import { saveUser, saveUserPending } from '../lib/actions/user'
import loadFirebase from '../lib/database'
import { getUserbyUid } from '../lib/handlers/user'
import { saveMembership, regexKey, loginMembership, setMembers, getAlianceProducts } from '../lib/handlers/member'
import { validateKey } from '../lib/actions/member'


class Member extends React.Component {

	async componentDidMount() {
		const auth = await loadFirebase('auth')
		const user = await auth.onAuthStateChanged(user => {
			this.props.saveUserPending()
			getUserbyUid(user.uid);
			return user ? this.props.saveUser(user) : null
		})
	}

	async componentWillReceiveProps(nextProps){
		if(nextProps.user !== this.props.user){
				await getProfile(this.props.user.uid)
				await setMembers(this.props.user.membership)
				await getAlianceProducts(this.props.aliancesId)
		}
		nextProps.name !== this.props.name ? 
			this.props.validateKey(RegExp(/[^a-z|A-Z|\s|[0-9]/g).exec(nextProps.name) === null): null
	}

	render() {
		return (
			<MemberView {...this.props} saveMembership={saveMembership} loginMembership={loginMembership}/>
		)
	}
}
Member = reduxForm({
	form: 'member'
})(Member)

const selector = formValueSelector('member')

const mapStateToProps = state => ({
	member: state.member,
	user: state.user,
	profile: state.profile,
	name: selector(state,'name'),
	passwordconfirmationLength: selector(state,'passwordconfirmation') ? selector(state,'passwordconfirmation').length : 0,
	passwordLength: selector(state,'password')? selector(state,'password').length: 0,
	passwordMatch: selector(state,'password') === selector(state,'passwordconfirmation'),
	password: selector(state,'password'),
	keyIsValid: state.member.keyIsValid
})

const mapDispatchToProps = {
	saveUserPending,
	saveUser,
	validateKey
}

export default withRedux(()=>store,mapStateToProps, mapDispatchToProps)(Member)
