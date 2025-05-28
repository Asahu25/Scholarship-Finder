import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import StudentProfileForm from "./Pages/StudentProfileForm"

export default function App(){
  const [count, setCount] = useState(0)

  return(
    <StudentProfileForm />
  );
}