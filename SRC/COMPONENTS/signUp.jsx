class Signup extends React.Component {



	render () {
		let onChange=this.props.parent.onChange
		//console.log('message in signup = ',this.props.message)
		return ( 
		<div>
			<h2> in sign up component</h2>
			<h4> {this.props.message}</h4>

			Email : <input type="text" name="email" onChange={onChange}></input><br/>
			Name : <input type="text" name="name" onChange={onChange}></input><br/>
			Zip : <input type="text" name="zip" onChange={onChange} ></input><br/>
			password : <input type="text" name="password" onChange={onChange}></input><br/>
			Pet : <input type="text" name="pet" onChange={onChange}></input><br/>
			<button type="button" onClick={this.props.parent.submitData}> VALIDATE </button>
		</div>
		)
	}
}