class App extends React.Component {

	constructor(props) {
		super(props);

		this.state={
			mockedServerRetrievedData : {},
			showProfile : true
		};

		this.onChange=this.onChange.bind(this);
		this.submitData=this.submitData.bind(this);
	}

	onChange (e) {
		var tempState={};
		tempState[e.target.name]=e.target.value;
		this.setState(
			 tempState)
	}

	toggleView () {
		//console.log('in toggle View //  showProfile = ',this.state );
		//console.log('in toggle View //  showProfile = ',this.state.showProfile );
		var newCondition = !this.state.showProfile
		this.setState({ showProfile : newCondition })
	}

	fetchData () {
		console.log('inside fetch data')
		var that=this;
		$.get('/api/dogowner',function(res){
			var lastSignedUpProfile=res[res.length-1];
			that.setState({ mockedServerRetrievedData : lastSignedUpProfile})
			console.log('in app fetchData and resp = ',lastSignedUpProfile)
			that.toggleView();
		})
	}

	submitData () {

		var that=this;
		console.log('this in app submit Data= ',this)
		
		fetch('/api/dogowner/signup', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify(this.state)
		}).then((res)=>{
		  console.log('in .then() function of post ',res)
		  this.fetchData()
		  // toggle profile view if success
		  //this.toggleView();
		})
		
		/*
		var dataz={};

		Object.keys(this.state).map(key=>{
			if (key !== 'mockedServerRetrievedData' && key !== 'showProfile') {
					dataz[key] = this.state[key];
			}
		})

		this.setState({ 
			mockedServerRetrievedData : dataz
		})
		//this.toggleView();
		*/
	}

	render() {
		//console.log('message in App = ',this.props.message)
		return (
			<div>
				<h2> in APP Component </h2>
			
			{ this.state.showProfile ? <Signup message={this.props.message} parent={this}/> : <Profile parent={this}/> }
			</div>
		)
	}
}

