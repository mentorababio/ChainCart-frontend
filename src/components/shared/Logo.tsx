import { Link } from 'react-router-dom';
import * as IMG from './../../assets';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center flex-col">
      <img src={IMG.ChainCart} alt="Logo" className=" h-[50px] w-[50px]" />
    </Link>
  );
}
