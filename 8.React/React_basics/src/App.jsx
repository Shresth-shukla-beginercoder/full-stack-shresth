import { useState } from 'react';

// Each lesson's component lives in its OWN file under src/components/
// and is imported here. App.jsx = the page that assembles everything
// into a responsive card grid.
import Greeter from './components/Greeter.jsx'; // 631/632 + 646
import Badge from './components/Badge.jsx'; // 633
import FruitList from './components/FruitList.jsx'; // 634/638
import Mood from './components/Mood.jsx'; // 635
import StyledBox from './components/StyledBox.jsx'; // 637
import SlotMachine from './components/SlotMachine.jsx'; // 639
import ObjectPractice from './components/ObjectPractice.jsx'; // 634
import ShoppingList from './components/ShoppingList.jsx'; // 640/641/642
import RentalProperties from './components/RentalProperties.jsx'; // 643/644
import Clicker from './components/Clicker.jsx'; // 647/650
import EventPlayground from './components/EventPlayground.jsx'; // 647/648/649
import Counter from './components/Counter.jsx'; // 651/652
import Toggler from './components/Toggler.jsx'; // 651/652/653/654
import ColorBox from './components/ColorBox.jsx'; // 655/656/657
import UpdaterDemo from './components/UpdaterDemo.jsx'; // 658/659/660
import UserForm from './components/UserForm.jsx'; // 661/662/663/664
import ArrayPatterns from './components/ArrayPatterns.jsx'; // 665/666
import ScoreKeeper from './components/ScoreKeeper.jsx'; // 667
import Lucky7 from './components/lucky7/Lucky7.jsx'; // 668-675
import SignupForm from './components/forms/SignupForm.jsx'; // 676-680
import ShoppingListForm from './components/forms/ShoppingListForm.jsx'; // 681-683
import ValidationFromScratch from './components/forms/ValidationFromScratch.jsx'; // 684
import RHFValidation from './components/forms/RHFValidation.jsx'; // 685
import GithubProfile from './components/effects/GithubProfile.jsx'; // 686-691
import MuiRating from './components/mui/MuiRating.jsx'; // 692-694/696
import MuiForm from './components/mui/MuiForm.jsx'; // 695/696
import TodoList from './components/todo/TodoList.jsx'; // 697-704

// 634: passing an array down as a prop
const fruits = ['🍎 apple', '🍌 banana', '🍇 grape'];

function App() {
  // 635: useState = the building block of React interactivity
  const [happy, setHappy] = useState(true);
  const [name, setName] = useState('Sam');

  // One entry per lesson demo. `wide` = full-width card (lists, games, todo).
  // `light` = white card (MUI components need light backgrounds).
  const demos = [
    { label: '631 · 632 · 646', title: 'Props + PropTypes', node: <Greeter person="Jasmine" age={42} favNum={7} /> },
    { label: '633', title: 'Default props', node: <div><Badge name="Maggie" /> <Badge /></div> },
    { label: '634 · 638', title: 'Arrays + .map()', node: <FruitList items={fruits} /> },
    { label: '635', title: 'Conditionals', node: <Mood happy={happy} changeMood={() => setHappy(!happy)} /> },
    { label: '637', title: 'Dynamic styles', node: <StyledBox text="dynamic text" /> },
    { label: '639', title: 'Slot machine', node: <SlotMachine /> },
    { label: '634', title: 'State as props (child edits parent)', node: <ObjectPractice name={name} setName={setName} /> },
    { label: '640-642', title: 'Shopping list', wide: true, node: <ShoppingList /> },
    { label: '643 · 644', title: 'Rental properties', wide: true, node: <RentalProperties /> },
    { label: '647 · 650', title: 'Clicker', node: <Clicker /> },
    { label: '648 · 649', title: 'Events + event object', node: <EventPlayground /> },
    { label: '651 · 652', title: 'Counter (state basics)', node: <Counter /> },
    { label: '653 · 654', title: 'Toggler (multiple state)', node: <Toggler /> },
    { label: '655-657', title: 'Color box', node: <ColorBox /> },
    { label: '658 · 659 · 660', title: 'Updater functions', node: <UpdaterDemo /> },
    { label: '661-664', title: 'Objects & arrays in state', wide: true, node: <UserForm /> },
    { label: '665 · 666', title: 'Array patterns', wide: true, node: <ArrayPatterns /> },
    { label: '667', title: 'Score keeper', wide: true, node: <ScoreKeeper /> },
    { label: '668-675', title: 'Lucky N 🎲', wide: true, node: <Lucky7 /> },
    { label: '676-680', title: 'Controlled signup form', wide: true, node: <SignupForm /> },
    { label: '681-683', title: 'Shopping list form', wide: true, node: <ShoppingListForm /> },
    { label: '684', title: 'Validation from scratch', wide: true, node: <ValidationFromScratch /> },
    { label: '685', title: 'react-hook-form validation', wide: true, node: <RHFValidation /> },
    { label: '686-691', title: 'GitHub profile search (effects)', wide: true, node: <GithubProfile /> },
    { label: '692-694 · 696', title: 'MUI rating', light: true, node: <MuiRating /> },
    { label: '695 · 696', title: 'MUI form + sx prop', light: true, wide: true, node: <MuiForm /> },
    { label: '697-704', title: 'Fancy Todo List ⭐', wide: true, node: <TodoList /> },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <h1>React Basics — Every Lesson, One Page</h1>
        <p>Props · State · Events · Forms · Effects · MUI · Todos — click around!</p>
      </header>

      {/* 638 refresher: render the whole demo list with .map() */}
      <div className="demo-grid">
        {demos.map((demo, i) => (
          <div
            key={i}
            className={`card ${demo.wide ? 'card--wide' : ''} ${demo.light ? 'card--light' : ''}`}
          >
            <span className="card-label">{demo.label}</span>
            <h3>{demo.title}</h3>
            {demo.node}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
