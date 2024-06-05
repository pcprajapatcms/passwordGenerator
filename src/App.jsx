import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [allowSmall, setAllowSmall] = useState(true);
  const [allowCaps, setAllowCaps] = useState(true);
  const [allowNumbers, setAllowNumbers] = useState(true);
  const [allowCharactors, setAllowCharactors] = useState(true);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "";

    if (allowSmall) str += "abcdefghijklmnopqrstuvwxyz";
    if (allowCaps) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (allowNumbers) str += "0123456789";
    if (allowCharactors) str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allowSmall, allowCaps, allowNumbers, allowCharactors]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowSmall, allowCaps, allowCharactors, allowNumbers, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password, length]);

  const countChecked = () => {
    return [allowSmall, allowCaps, allowNumbers, allowCharactors].filter(Boolean).length;
  };

  const handleCheckboxChange = (setter, currentValue) => {
    return () => {
      if (currentValue && countChecked() === 1) {
        return;
      }
      setter(prev => !prev);
    };
  };

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-5 bg-slate-800">
        <div>
          <h1 className="text-5xl text-white font-bold block tracking-wide">Password Generator</h1>
          <div className="w-full bg-slate-900 text-white mt-8 rounded-md p-5 relative border-dashed border-2 border-accent">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              className=" w-full h-10 bg-slate-900 text-white rounded-md text-xl focus-visible:outline-none"
            />
            <button
              onClick={copyPassword}
              className="absolute top-6 right-4 bg-accent hover:bg-success text-white px-2 py-1 rounded-md"
            >
              Copy
            </button>
          </div>

          <div className="w-full bg-slate-700 text-white mt-8 rounded-md p-5 relative">
            <h2 className="text-2xl font-medium border-solid border-b-2 border-accent pb-2 mb-4">
              Make Your Own Password
            </h2>
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start w-full gap-2">
                <label htmlFor="length" className="text-lg">
                  Length ({length})
                </label>
                <input
                  type="range"
                  min={4}
                  max={30}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="range range-accent w-full"
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="allowSmall"
                  className="checkbox checkbox-accent rounded-sm"
                  checked={allowSmall}
                  onChange={handleCheckboxChange(setAllowSmall, allowSmall)}
                />{" "}
                <label htmlFor="allowSmall" className="text-lg">
                  Small Letters
                </label>
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="allowCaps"
                  className="checkbox checkbox-accent rounded-sm"
                  checked={allowCaps}
                  onChange={handleCheckboxChange(setAllowCaps, allowCaps)}
                />
                <label htmlFor="allowCaps" className="text-lg">
                  Capital Letters
                </label>
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="allowNumbers"
                  className="checkbox checkbox-accent rounded-sm"
                  checked={allowNumbers}
                  onChange={handleCheckboxChange(setAllowNumbers, allowNumbers)}
                />
                <label htmlFor="allowNumbers" className="text-lg">
                  Numbers
                </label>
              </div>
              <div className="flex flex-row items-center gap-2">
                <input
                  type="checkbox"
                  id="allowCharactors"
                  className="checkbox checkbox-accent rounded-sm"
                  checked={allowCharactors}
                  onChange={handleCheckboxChange(setAllowCharactors, allowCharactors)}
                />
                <label htmlFor="allowCharactors" className="text-lg">
                  Special Charactors
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
