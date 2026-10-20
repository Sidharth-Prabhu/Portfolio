import { useState, useEffect, useRef } from 'react';

const initialFS = {
  type: 'dir',
  contents: {
    'README.txt': {
      type: 'file',
      content: 'Welcome to ShOS!\\nVersion 1.0.0\\nType "help" to see available commands.\\n\\nThis is an educational OS built from scratch.'
    }
  }
};

const ShOS = ({ onClose }) => {
  const [fs, setFs] = useState(initialFS);
  const [cwd, setCwd] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [mode, setMode] = useState('boot'); // boot, shell, editor, tictactoe
  
  // Editor state
  const [editorFile, setEditorFile] = useState('');
  const [editorContent, setEditorContent] = useState('');

  // TicTacToe state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const inputRef = useRef(null);
  const shellEndRef = useRef(null);
  const editorRef = useRef(null);

  // Focus management
  useEffect(() => {
    if (mode === 'shell' && inputRef.current) {
      inputRef.current.focus();
    } else if (mode === 'editor' && editorRef.current) {
      editorRef.current.focus();
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'shell') {
      shellEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, mode]);

  // Boot sequence
  useEffect(() => {
    if (mode === 'boot') {
      const bootMessages = [
        "Loading kernel at 0x100000...",
        "Initializing VGA Text Mode (80x25)...",
        "Initializing PS/2 Keyboard Driver...",
        "Setting up basic memory management...",
        "Mounting RAM-based Hierarchical Filesystem...",
        "Starting Shell Interface...",
        "Welcome to ShOS (Simulated Environment v1.0.0)",
        ""
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < bootMessages.length) {
          setHistory(prev => [...prev, bootMessages[index]]);
          index++;
        } else {
          clearInterval(interval);
          setMode('shell');
        }
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [mode]);

  // FS Helpers
  const resolvePath = (currentCwd, targetStr) => {
    if (!targetStr) return currentCwd;
    const parts = targetStr.split('/').filter(p => p !== '' && p !== '.');
    let newPath = targetStr.startsWith('/') ? [] : [...currentCwd];
    for (const p of parts) {
      if (p === '..') {
        if (newPath.length > 0) newPath.pop();
      } else {
        newPath.push(p);
      }
    }
    return newPath;
  };

  const getNode = (currentFs, pathArr) => {
    let curr = currentFs;
    for (const p of pathArr) {
      if (curr.type !== 'dir' || !curr.contents[p]) return null;
      curr = curr.contents[p];
    }
    return curr;
  };

  const printLine = (text) => setHistory(prev => [...prev, text]);

  const handleCommand = (cmdStr) => {
    if (!cmdStr.trim()) return;
    
    // Simple parsing to handle quotes for the write command
    const args = cmdStr.trim().match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const parsedArgs = args.map(a => a.replace(/^"|"$/g, ''));
    
    const cmd = parsedArgs[0].toLowerCase();
    
    let newHistory = [...history, `shos@${cwd.length === 0 ? '/' : '/' + cwd.join('/')}$ ${cmdStr}`];
    setHistory(newHistory);
    
    const fsClone = JSON.parse(JSON.stringify(fs));

    switch (cmd) {
      case 'help':
        printLine('Available Commands:');
        printLine('  ls [path]         - List directory contents');
        printLine('  pwd               - Print working directory');
        printLine('  cd [path]         - Change directory');
        printLine('  mkdir <dirname>   - Create directory');
        printLine('  touch <filename>  - Create empty file');
        printLine('  cat <filename>    - Display file contents');
        printLine('  edit <filename>   - Edit file in text editor');
        printLine('  write <f> <cont>  - Write content to file');
        printLine('  rm <path>         - Remove file or directory');
        printLine('  clear             - Clear the screen');
        printLine('  echo <text>       - Echo text to screen');
        printLine('  info              - Show system info');
        printLine('  add/sub/mul/div   - Math operations (e.g., add 5 3)');
        printLine('  tictactoe         - Play Tic Tac Toe');
        printLine('  shutdown          - Close simulation');
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'echo':
        printLine(parsedArgs.slice(1).join(' '));
        break;

      case 'info':
        printLine('ShOS - Simulated Educational OS');
        printLine('Architecture: x86 (32-bit protected mode simulation)');
        printLine('Filesystem: RAM-based hierarchical');
        printLine('Features: Basic shell, fs, editor, and games');
        break;

      case 'pwd':
        printLine(`/${cwd.join('/')}`);
        break;

      case 'ls': {
        const targetPathStr = parsedArgs[1] || '.';
        const targetPath = resolvePath(cwd, targetPathStr);
        const node = getNode(fsClone, targetPath);
        if (!node) {
          printLine(`ls: cannot access '${targetPathStr}': No such file or directory`);
        } else if (node.type !== 'dir') {
          printLine(targetPath[targetPath.length - 1]);
        } else {
          const keys = Object.keys(node.contents);
          if (keys.length === 0) {
            printLine('(empty directory)');
          } else {
            printLine(keys.map(k => node.contents[k].type === 'dir' ? `${k}/` : k).join('  '));
          }
        }
        break;
      }

      case 'cd': {
        const targetPathStr = parsedArgs[1] || '/';
        const targetPath = resolvePath(cwd, targetPathStr);
        const node = getNode(fsClone, targetPath);
        if (!node) {
          printLine(`cd: ${targetPathStr}: No such file or directory`);
        } else if (node.type !== 'dir') {
          printLine(`cd: ${targetPathStr}: Not a directory`);
        } else {
          setCwd(targetPath);
        }
        break;
      }

      case 'mkdir': {
        if (!parsedArgs[1]) {
          printLine('mkdir: missing operand');
          break;
        }
        const newPath = resolvePath(cwd, parsedArgs[1]);
        const name = newPath.pop();
        const parentNode = getNode(fsClone, newPath);
        
        if (!parentNode || parentNode.type !== 'dir') {
          printLine(`mkdir: cannot create directory '${parsedArgs[1]}': No such file or directory`);
        } else if (parentNode.contents[name]) {
          printLine(`mkdir: cannot create directory '${parsedArgs[1]}': File exists`);
        } else {
          parentNode.contents[name] = { type: 'dir', contents: {} };
          setFs(fsClone);
        }
        break;
      }

      case 'touch': {
        if (!parsedArgs[1]) {
          printLine('touch: missing operand');
          break;
        }
        const newPath = resolvePath(cwd, parsedArgs[1]);
        const name = newPath.pop();
        const parentNode = getNode(fsClone, newPath);
        
        if (!parentNode || parentNode.type !== 'dir') {
          printLine(`touch: cannot touch '${parsedArgs[1]}': No such file or directory`);
        } else if (!parentNode.contents[name]) {
          parentNode.contents[name] = { type: 'file', content: '' };
          setFs(fsClone);
        }
        break;
      }

      case 'write': {
        if (parsedArgs.length < 3) {
          printLine('Usage: write <filename> <content>');
          break;
        }
        const newPath = resolvePath(cwd, parsedArgs[1]);
        const name = newPath.pop();
        const parentNode = getNode(fsClone, newPath);
        
        if (!parentNode || parentNode.type !== 'dir') {
          printLine(`write: cannot write to '${parsedArgs[1]}': No such file or directory`);
        } else {
          parentNode.contents[name] = { type: 'file', content: parsedArgs[2] };
          setFs(fsClone);
          printLine(`Written to ${parsedArgs[1]}`);
        }
        break;
      }

      case 'cat': {
        if (!parsedArgs[1]) {
          printLine('cat: missing operand');
          break;
        }
        const targetPath = resolvePath(cwd, parsedArgs[1]);
        const node = getNode(fsClone, targetPath);
        if (!node) {
          printLine(`cat: ${parsedArgs[1]}: No such file or directory`);
        } else if (node.type === 'dir') {
          printLine(`cat: ${parsedArgs[1]}: Is a directory`);
        } else {
          // print line by line
          const lines = (node.content || '').split('\\n');
          lines.forEach(l => printLine(l));
        }
        break;
      }

      case 'rm': {
        if (!parsedArgs[1]) {
          printLine('rm: missing operand');
          break;
        }
        const targetPath = resolvePath(cwd, parsedArgs[1]);
        if (targetPath.length === 0) {
          printLine('rm: cannot remove root directory');
          break;
        }
        const name = targetPath.pop();
        const parentNode = getNode(fsClone, targetPath);
        
        if (!parentNode || !parentNode.contents[name]) {
          printLine(`rm: cannot remove '${parsedArgs[1]}': No such file or directory`);
        } else {
          const targetNode = parentNode.contents[name];
          if (targetNode.type === 'dir' && Object.keys(targetNode.contents).length > 0) {
            printLine(`rm: cannot remove '${parsedArgs[1]}': Directory not empty`);
          } else {
            delete parentNode.contents[name];
            setFs(fsClone);
          }
        }
        break;
      }

      case 'edit': {
        if (!parsedArgs[1]) {
          printLine('edit: missing operand');
          break;
        }
        const targetPath = resolvePath(cwd, parsedArgs[1]);
        const node = getNode(fsClone, targetPath);
        if (node && node.type === 'dir') {
          printLine(`edit: ${parsedArgs[1]}: Is a directory`);
          break;
        }
        setEditorFile(parsedArgs[1]);
        setEditorContent(node ? node.content : '');
        setMode('editor');
        break;
      }

      case 'add':
      case 'sub':
      case 'mul':
      case 'div': {
        if (parsedArgs.length < 3) {
          printLine(`Usage: ${cmd} <num1> <num2>`);
          break;
        }
        const n1 = parseFloat(parsedArgs[1]);
        const n2 = parseFloat(parsedArgs[2]);
        if (isNaN(n1) || isNaN(n2)) {
          printLine(`${cmd}: invalid numbers`);
          break;
        }
        let res = 0;
        if (cmd === 'add') res = n1 + n2;
        if (cmd === 'sub') res = n1 - n2;
        if (cmd === 'mul') res = n1 * n2;
        if (cmd === 'div') {
          if (n2 === 0) printLine('Division by zero error');
          else res = n1 / n2;
        }
        if (cmd !== 'div' || n2 !== 0) printLine(`Result: ${res}`);
        break;
      }

      case 'tictactoe':
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setMode('tictactoe');
        break;

      case 'shutdown':
        if (onClose) onClose();
        break;

      default:
        printLine(`Command not found: ${cmd}`);
        break;
    }
  };

  const handleShellKeyDown = (e) => {
    if (e.key === 'Enter') {
      const val = input;
      setInput('');
      setCmdHistory(prev => [val, ...prev]);
      setHistoryIndex(-1);
      handleCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  // Editor Actions
  const saveFile = () => {
    const fsClone = JSON.parse(JSON.stringify(fs));
    const targetPath = resolvePath(cwd, editorFile);
    const name = targetPath.pop();
    const parentNode = getNode(fsClone, targetPath);
    
    if (parentNode && parentNode.type === 'dir') {
      parentNode.contents[name] = { type: 'file', content: editorContent };
      setFs(fsClone);
    }
  };

  const handleEditorKeyDown = (e) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveFile();
      // Brief visual feedback could go here
    }
    if (e.ctrlKey && e.key === 'x') {
      e.preventDefault();
      setMode('shell');
    }
  };

  // TicTacToe logic
  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleTicTacToeKeyDown = (e) => {
    if (e.key === 'q' || e.key === 'Escape') {
      setMode('shell');
      return;
    }
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      const index = num - 1;
      if (board[index] || checkWinner(board)) return;
      const newBoard = [...board];
      newBoard[index] = xIsNext ? 'X' : 'O';
      setBoard(newBoard);
      setXIsNext(!xIsNext);
    }
  };

  // Focus trap for games
  useEffect(() => {
    if (mode === 'tictactoe') {
      window.addEventListener('keydown', handleTicTacToeKeyDown);
      return () => window.removeEventListener('keydown', handleTicTacToeKeyDown);
    }
  });

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-green-500 font-mono text-sm md:text-base overflow-hidden flex flex-col">
      {mode === 'boot' && (
        <div className="flex-1 p-4 overflow-y-auto">
          {history.map((line, i) => <div key={i}>{line}</div>)}
          <span className="animate-pulse">_</span>
        </div>
      )}

      {mode === 'shell' && (
        <div className="flex-1 p-4 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">{line}</div>
          ))}
          <div className="flex items-center">
            <span className="mr-2">shos@/{cwd.join('/')}$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent outline-none text-green-500 border-none p-0 focus:ring-0"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleShellKeyDown}
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={shellEndRef} />
        </div>
      )}

      {mode === 'editor' && (
        <div className="flex flex-col h-full bg-black">
          <div className="bg-gray-800 text-white p-1 text-center font-bold">
            GNU nano 6.2 - {editorFile}
          </div>
          <textarea
            ref={editorRef}
            className="flex-1 bg-transparent text-gray-200 outline-none resize-none p-2 w-full border-none focus:ring-0"
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            onKeyDown={handleEditorKeyDown}
            autoFocus
            spellCheck="false"
          />
          <div className="bg-gray-800 text-white p-2 flex justify-between text-xs sm:text-sm border-t border-gray-700">
            <div className="flex gap-4">
              <span><b>^S</b> Save</span>
              <span><b>^X</b> Exit</span>
            </div>
            <span>ShOS Text Editor</span>
          </div>
        </div>
      )}

      {mode === 'tictactoe' && (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl mb-8 font-bold text-white">Tic Tac Toe</h2>
          
          <div className="grid grid-cols-3 gap-2 bg-green-500 p-2 rounded">
            {board.map((cell, i) => (
              <div 
                key={i} 
                className="w-20 h-20 bg-black flex items-center justify-center text-4xl font-bold cursor-default"
              >
                {cell ? (
                  <span className={cell === 'X' ? 'text-red-500' : 'text-blue-500'}>{cell}</span>
                ) : (
                  <span className="text-gray-800 text-xl">{i + 1}</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-xl">
            {checkWinner(board) 
              ? <span className="text-yellow-400 font-bold">Winner: {checkWinner(board)}!</span> 
              : board.every(c => c !== null) 
                ? <span className="text-yellow-400 font-bold">It's a draw!</span>
                : <span>Next player: {xIsNext ? 'X' : 'O'}</span>
            }
          </div>

          <div className="mt-8 text-gray-400">
            Press keys 1-9 to make a move. Press 'Q' to quit.
          </div>
        </div>
      )}
    </div>
  );
};

export default ShOS;
