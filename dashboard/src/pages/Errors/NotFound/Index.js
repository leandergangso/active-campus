import { Link, useNavigate } from "react-router-dom";
import logo from '../../../images/logo.png'

const Index = () => {
	const navigate = useNavigate()

	return (
		<div className="bg-background h-screen">
			<div className="flex flex-col items-center justify-center h-full py-2 gap-10">
				<img src={logo} alt="logo" />
				<div className="flex flex-col gap-5 text-center border border-border p-5 py-10 sm:p-20 rounded-md bg-light">
					<h1 className="font-bold text-6xl text-danger">404</h1>
					<h2 className="font-bold text-2xl text-placeholder">Fant ikke denne siden</h2>
					<Link to='/' className='bg-primary text-center rounded-md py-2 px-10 text-light font-bold'>Hjem</Link>
				</div>
			</div>
		</div>
	)
};

export default Index;
