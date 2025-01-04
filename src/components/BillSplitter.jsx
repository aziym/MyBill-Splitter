import React, { useState } from 'react';
import { Plus, Minus, User, DollarSign, Percent, Moon, Sun, Receipt, Heart } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Button } from './Button';
import { Input } from './Input';

const Copyright = () => (
  <div className="text-center mt-6 py-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
    <div className="mt-1">
      <span>© {new Date().getFullYear()} Created by Azim Bakri</span>
    </div>
  </div>
);

const BillSplitter = () => {
  const { theme, setTheme } = useTheme();
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [people, setPeople] = useState([
    { id: 1, name: '', amount: '' }
  ]);
  const [splitEqually, setSplitEqually] = useState(true);
  const [roundUp, setRoundUp] = useState(false);

  const fadeInUp = "animate-[fadeIn_0.3s_ease-out]";
  const slideIn = "animate-[slideIn_0.3s_ease-out]";

  const addPerson = () => {
    setPeople([...people, { id: people.length + 1, name: '', amount: '' }]);
  };

  const removePerson = (id) => {
    if (people.length > 1) {
      setPeople(people.filter(person => person.id !== id));
    }
  };

  const updatePerson = (id, field, value) => {
    setPeople(people.map(person => 
      person.id === id ? { ...person, [field]: value } : person
    ));
  };

  const calculateTotalWithTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = bill * (parseFloat(tipPercentage) / 100);
    return bill + tip;
  };

  const calculateShare = () => {
    const total = calculateTotalWithTip();
    if (splitEqually) {
      let share = total / people.length;
      return roundUp ? Math.ceil(share) : Number(share.toFixed(2));
    } else {
      const customTotal = people.reduce((sum, person) => 
        sum + (parseFloat(person.amount) || 0), 0);
      const ratio = total / customTotal;
      return people.map(person => ({
        ...person,
        share: roundUp 
          ? Math.ceil((parseFloat(person.amount) || 0) * ratio)
          : Number(((parseFloat(person.amount) || 0) * ratio).toFixed(2))
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900 p-4 md:p-8 transition-all duration-300">
      <div className="sticky top-0 z-50 flex justify-end mb-4">
        <Button
          variant="outline"
          className="p-2 hover:rotate-90 transition-transform duration-300 bg-white dark:bg-gray-800 shadow-lg
                    rounded-full w-12 h-10 flex items-center justify-center"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5 text-purple-600" />
          ) : (
            <Sun className="h-5 w-5 text-yellow-400" />
          )}
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 space-y-8 transition-all duration-300
                      hover:shadow-xl transform hover:-translate-y-1 border border-purple-100 dark:border-blue-900">
          <div className="flex items-center justify-center space-x-3">
            <Receipt className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent
                          hover:scale-105 transition-transform duration-300">
              Bill Splitter
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Bill Amount (RM)
              </label>
              <div className="relative group">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-purple-500 dark:text-purple-400
                                     group-hover:text-blue-500 transition-colors duration-200" />
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-10 transform transition-all duration-200 hover:translate-x-1 border-purple-200 dark:border-purple-900
                           focus:ring-purple-500 dark:focus:ring-purple-400"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Tip Percentage (Enter 0 for no tip)
              </label>
              <div className="relative group">
                <Percent className="absolute left-3 top-2.5 h-5 w-5 text-purple-500 dark:text-purple-400
                                  group-hover:text-blue-500 transition-colors duration-200" />
                <Input
                  type="number"
                  placeholder="15"
                  className="pl-10 transform transition-all duration-200 hover:translate-x-1 border-purple-200 dark:border-purple-900
                           focus:ring-purple-500 dark:focus:ring-purple-400"
                  value={tipPercentage}
                  onChange={(e) => setTipPercentage(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Split Type
            </label>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant={splitEqually ? "primary" : "secondary"}
                onClick={() => setSplitEqually(true)}
                className="flex-1 transform hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-purple-600 to-blue-600
                         hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Split Equally
              </Button>
              <Button
                variant={!splitEqually ? "primary" : "secondary"}
                onClick={() => setSplitEqually(false)}
                className="flex-1 transform hover:scale-105 transition-transform duration-200 bg-gradient-to-r from-blue-600 to-purple-600
                         hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Custom Split
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                People
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={addPerson}
                className="hover:rotate-180 transition-transform duration-300 border-purple-200 dark:border-purple-900
                         hover:bg-purple-50 dark:hover:bg-purple-900/50"
              >
                <Plus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {people.map((person, index) => (
                <div key={person.id} className={`flex space-x-2 ${fadeInUp}`}>
                  <div className="relative flex-1 group">
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-purple-500 dark:text-purple-400
                                   group-hover:text-blue-500 transition-colors duration-200" />
                    <Input
                      placeholder={`Person ${index + 1}`}
                      className="pl-10 transform transition-all duration-200 hover:translate-x-1 border-purple-200 dark:border-purple-900
                               focus:ring-purple-500 dark:focus:ring-purple-400"
                      value={person.name}
                      onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                    />
                  </div>
                  {!splitEqually && (
                    <div className="relative w-32 group">
                      <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-purple-500 dark:text-purple-400
                                           group-hover:text-blue-500 transition-colors duration-200" />
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-10 transform transition-all duration-200 hover:translate-x-1 border-purple-200 dark:border-purple-900
                                 focus:ring-purple-500 dark:focus:ring-purple-400"
                        value={person.amount}
                        onChange={(e) => updatePerson(person.id, 'amount', e.target.value)}
                      />
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="p-2 hover:rotate-90 transition-transform duration-300 border-purple-200 dark:border-purple-900
                             hover:bg-red-50 dark:hover:bg-red-900/50"
                    onClick={() => removePerson(person.id)}
                    disabled={people.length === 1}
                  >
                    <Minus className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="roundUp"
              checked={roundUp}
              onChange={(e) => setRoundUp(e.target.checked)}
              className="rounded border-purple-300 dark:border-purple-600 text-purple-600 
                        transition-all duration-200 hover:scale-110 focus:ring-purple-500"
            />
            <label 
              htmlFor="roundUp"
              className="text-sm text-gray-700 dark:text-gray-200"
            >
              Round up to nearest ringgit
            </label>
          </div>

          {billAmount && (
            <div className={`mt-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/50 dark:to-blue-900/50 
                          rounded-xl p-6 transform transition-all duration-300 ${slideIn} border border-purple-100 dark:border-blue-800`}>
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 
                            dark:from-purple-400 dark:to-blue-400">
                Summary
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-200">
                <p className="flex justify-between items-center">
                  <span className="font-semibold">Total Bill:</span>
                  <span className="text-lg">RM {parseFloat(billAmount).toFixed(2)}</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="font-semibold">Tip ({tipPercentage}%):</span>
                  <span className="text-lg">RM {(parseFloat(billAmount) * (parseFloat(tipPercentage) / 100)).toFixed(2)}</span>
                </p>
                <p className="flex justify-between items-center text-lg font-bold text-purple-600 dark:text-purple-400">
                  <span>Total with Tip:</span>
                  <span>RM {calculateTotalWithTip().toFixed(2)}</span>
                </p>
                {splitEqually ? (
                  <p className="flex justify-between items-center mt-4 text-lg font-bold text-blue-600 dark:text-blue-400">
                    <span>Each Person Pays:</span>
                    <span>RM {calculateShare()}</span>
                  </p>
                ) : (
                  <div className="space-y-2 mt-4">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Individual Shares:</p>
                    {calculateShare().map((person, index) => (
                      <p key={person.id} className="flex justify-between items-center">
                        <span>{person.name || `Person ${index + 1}`}:</span>
                        <span className="font-semibold">RM {person.share}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Added Copyright Component */}
        <Copyright />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
      `}</style>
    </div>
  );
};

export default BillSplitter;









