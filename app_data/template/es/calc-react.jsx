// Get the `useReducer` function from either Preact or React
// depending on which Library was loaded with the page.
// To switch to Preact from React see comments in [app-react.htm].
const useReducer = (window.preactHooks === undefined ? React.useReducer : preactHooks.useReducer);

// Simple array to match the pages <select>
const ops = [ '+', '-', '*', '/' ];

// Helper Function
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Calculator Functions
const calc = {
    add: function(x, y) { return x + y; },
    subtract: function(x, y) { return x - y; },
    multiply: function(x, y) { return x * y; },
    divide: function(x, y) { return x / y; },
    calculate: function(x, op, y) {
        switch (op) {
            case '+':
                return this.add(x, y);
            case '-':
                return this.subtract(x, y);
            case '*':
                return this.multiply(x, y);
            case '/':
                return this.divide(x, y);
        }
    },
};

const initialState = {
    results: [],
    currentOp: ops[getRandomInt(4)],
    currentX: getRandomInt(1000000),
    currentY: getRandomInt(1000000),
}

const EVENT_CALCULATE = 'calculate';
const EVENT_CHANGE_X = 'change-x';
const EVENT_CHANGE_Y = 'change-y';
const EVENT_CHANGE_OP = 'change-op';

function reducer(state, action) {
    switch (action.type) {
        case EVENT_CALCULATE:
            const z = calc.calculate(state.currentX, state.currentOp, state.currentY);
            const result = {
                x: state.currentX,
                op: state.currentOp,
                y: state.currentY,
                z: z,
                hasError: isNaN(z),
            };
            const newState = {
                results: [result].concat(state.results), // Add to front of Array
                currentOp: ops[getRandomInt(4)],
                currentX: getRandomInt(1000000),
                currentY: getRandomInt(1000000),
            };
            // Save to DataFormsJS Cache object so that existing values will be
            // kept in memory when the page is navigated away from and back to.
            Cache.set('calc', newState);
            return newState;
        case EVENT_CHANGE_X:
            return {
                ...state,
                currentX: action.currentX
            };
        case EVENT_CHANGE_Y:
            return {
                ...state,
                currentY: action.currentY
            };
        case EVENT_CHANGE_OP:
            return {
                ...state,
                currentOp: action.currentOp
            };
        default:
            throw new Error('Unknown action');
    }
}

/**
 * Calculator Component
 */
export function Calculator() {
    // `Cache` is a DataFormsJS class for React. It includes `get()` and `set()` methods
    // for caching an object. It allows for easy saving of state on different pages of
    // Single Page Apps (SPA) so that the previous state is returned in memory.
    const [state, dispatch] = useReducer(reducer, Cache.get('calc', initialState));
    const onChangeX = (e) => { dispatch({ type: EVENT_CHANGE_X, currentX: e.target.value }) };
    const onChangeY = (e) => { dispatch({ type: EVENT_CHANGE_Y, currentY: e.target.value }) };
    const onChangeOp = (e) => { dispatch({ type: EVENT_CHANGE_OP, currentOp: e.target.value }) };
    const onButtonClick = () => { dispatch({ type: EVENT_CALCULATE }) };

    return (
        <>
            <h1>Calculator</h1>

            <section className="calc">
                <input value={state.currentX} onChange={onChangeX} placeholder="Value X" size="7" />
                <select id="current-op" value={state.currentOp} onChange={onChangeOp}>
                    <option value="+">Add (+)</option>
                    <option value="-">Subtract (-)</option>
                    <option value="*">Multiply (*)</option>
                    <option value="/">Divide (/)</option>
                </select>
                <input value={state.currentY} onChange={onChangeY} placeholder="Value Y" size="7" />
                <button onClick={onButtonClick}>Calculate</button>
            </section>

            {state.results.length > 0 && <section className="calc-result">
                <ul>
                    {state.results.map(item => {
                        return <li className={item.hasError ? 'error' : ''}>
                            <span>{item.x}</span>
                            <span>{item.op}</span>
                            <span>{item.y}</span> = <span>{item.z}</span>
                        </li>
                    })}
                </ul>
            </section>}
        </>
    );
}
