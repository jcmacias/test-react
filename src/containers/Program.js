import { useLocation } from 'react-router-dom';
import ProgramForm from '../components/ProgramForm.js';

function Program() {
  const { state } = useLocation();
  const { cbo } = state;
  console.log('first', cbo)
  return (
    <div className="App">
      <ProgramForm cbo={cbo} />
    </div>
  );
}

export default Program;
