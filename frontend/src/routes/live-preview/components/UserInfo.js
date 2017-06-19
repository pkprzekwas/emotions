import React from 'react'

const appearance = [
	{type: 'gender'},
	{type: 'glasses'},
	{type: 'age'},
	{type: 'ethnicity'},
]

const UserInfo = (props) => (
	<div className="row">
		<br/>
		<h3 className="text-center">User Info</h3>
		<hr/>
		{
			appearance.map((feature) => (
				<div key={feature.type}>
					<div className="col-sm-12 col-md-5">
						<p className="text-muted"><strong>{feature.type} :</strong></p>
					</div>
					<div className="col-sm-12 col-md-7">
						<p className="text-primary"><strong>{props.appearanceValues[feature.type]}</strong></p>
					</div>
				</div>
			))
		}
	</div>
);

export default UserInfo
