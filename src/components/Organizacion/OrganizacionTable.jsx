import React, { useState, useMemo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, ChevronRight, PlusCircle, X,  AlertCircle, Clock, FilePenLine, Pencil, PanelLeftClose, PanelLeftOpen, Sparkles, ExternalLink } from 'lucide-react';


// --- Datos Simulados ---

// --- Opciones de Clasificación ---
const CLASIFICACION_OPTIONS = ['SOP', 'Guia Tecnica', 'Runbook', 'Playbook', 'KBA'];


// --- Componentes de UI Reutilizables ---

const InputField = ({ label, value, onChange, placeholder, name, onBlur }) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
        <input type="text" name={name} value={value || ''} onChange={onChange} onBlur={onBlur} placeholder={placeholder} className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50"/>
    </div>
);

// --- NUEVO: SelectField ---
const SelectField = ({ label, value, onChange, name, options }) => (
    <div>
        {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
        <select 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50"
        >
            <option value="" disabled>Seleccione...</option>
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    </div>
);


const TextAreaField = ({ label, value, onChange, placeholder, rows = 1, name }) => {
    const textareaRef = useRef(null);

    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            const scrollHeight = textarea.scrollHeight;
            textarea.style.height = `${scrollHeight}px`; // Set to scroll height
        }
    }, [value]);

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>}
            <textarea
                ref={textareaRef}
                name={name}
                value={value || ''}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 resize-none overflow-hidden"
            />
        </div>
    );
};

const CollapsibleSection = ({ title, children, isOpen, onToggle }) => {
    return (
        <div className="border-t border-gray-200">
            <button 
                onClick={onToggle} 
                className={`w-full flex justify-between items-center py-3 px-6 text-left transition-colors duration-200 hover:bg-gray-100 ${isOpen ? 'bg-gray-200' : ''}`}
            >
                <h3 className="font-semibold text-gray-700">{title}</h3>
                <div className="flex items-center gap-2">
                    {isOpen && <Sparkles className="text-gray-400 hover:text-orange-500 transition-colors" size={20} />}
                    {isOpen 
                        ? <ChevronDown className="transition-transform duration-300 text-orange-500" size={20} /> 
                        : <ChevronRight className="transition-transform duration-300 text-gray-500" size={20} />
                    }
                </div>
            </button>
            <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                 <div className="overflow-hidden"> {/* Este overflow-hidden es necesario para la animación grid */}
                    <div className="pt-2 pb-4 px-6 space-y-4 bg-white">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddNewTaskForm = ({ onSave, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState(''); // Add description state
    
    const handleSave = () => {
        if (name.trim() && description.trim()) { // Check both
            onSave({ name, description }); // Pass both
        }
    };

    return (
        <div className="p-3 mt-4 space-y-3 bg-orange-50 border-t-2 border-orange-200">
            <h4 className="font-semibold text-sm text-gray-700">Nuevo SubProceso</h4>
            <InputField placeholder="Nombre del SubProceso" value={name} onChange={(e) => setName(e.target.value)} />
            <TextAreaField // Add description field
                placeholder="Descripción del SubProceso" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                rows={2} 
            />
            <div className="flex justify-end gap-2">
                <button onClick={onCancel} className="px-3 py-1 text-xs font-semibold bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancelar</button>
                <button 
                    onClick={handleSave} 
                    className="px-3 py-1 text-xs font-semibold bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-300" 
                    disabled={!name.trim() || !description.trim()} // Disable if either is empty
                >
                    Guardar SubProceso
                </button>
            </div>
        </div>
    );
};


// --- Componente de Autocompletar Tags (CON PORTAL) ---
// const AutocompleteTagInput = ({ name, tags = [], onChange, suggestionList = [], placeholder, maxTags = Infinity }) => {
//     const [inputValue, setInputValue] = useState('');
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const wrapperRef = useRef(null); // Ref para el input/wrapper
//     const portalRef = useRef(null); // Ref para el portal/lista
//     const suggestionsRef = useRef(null); // Ref para la <ul> real
    
//     const [portalStyle, setPortalStyle] = useState({ top: 0, left: 0, width: 0, opensUp: false });

//     const filteredSuggestions = useMemo(() => {
//         if (!inputValue) return [];
//         return suggestionList.filter(
//             suggestion => 
//                 suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
//                 !tags.includes(suggestion)
//         );
//     }, [inputValue, suggestionList, tags]);

//     // Función para calcular y setear la posición del portal
//     const positionPortal = useCallback(() => {
//         if (!wrapperRef.current) return;
//         const inputRect = wrapperRef.current.getBoundingClientRect();
        
//         // Estimar altura de la lista
//         let estAltura = 160; // Max height
//         if (suggestionsRef.current) {
//             // Usar altura real si está disponible
//             estAltura = suggestionsRef.current.offsetHeight;
//         } else {
//             // Estimar basada en items, max 160
//             estAltura = Math.min(160, (filteredSuggestions.length || 1) * 32); // 32px por item
//         }

//         const espacioAbajo = window.innerHeight - inputRect.bottom;
//         const abreArriba = espacioAbajo < estAltura && inputRect.top > estAltura;

//         setPortalStyle({
//             top: abreArriba ? (inputRect.top - estAltura - 4) : (inputRect.bottom + 4), // 4px de gap
//             left: inputRect.left,
//             width: inputRect.width,
//             opensUp: abreArriba
//         });
//     }, [filteredSuggestions.length]);
    
//     // Recalcular posición al hacer focus o escribir
//     const handleInputFocus = () => {
//         setShowSuggestions(true);
//         setTimeout(positionPortal, 0); // setTimeout para esperar render
//     };

//     const handleInputChangeLocal = (e) => {
//         setInputValue(e.target.value);
//         if (!showSuggestions) {
//             setShowSuggestions(true);
//         }
//         setTimeout(positionPortal, 0);
//     };

//     // Recalcular posición en scroll y resize
//     useEffect(() => {
//         if (!showSuggestions) return;
//         positionPortal(); // Posición inicial
        
//         const onScroll = () => positionPortal();
//         const onResize = () => positionPortal();
        
//         window.addEventListener('scroll', onScroll, true); // `true` para capturar scroll en iframes/contenedores
//         window.addEventListener('resize', onResize);
        
//         return () => {
//             window.removeEventListener('scroll', onScroll, true);
//             window.removeEventListener('resize', onResize);
//         };
//     }, [showSuggestions, positionPortal]);

//     // Manejar click outside
//     useEffect(() => {
//         function handleClickOutside(e) {
//             const clickedInsideInput = wrapperRef.current?.contains(e.target);
//             const clickedInsidePortal = portalRef.current?.contains(e.target);
            
//             if (!clickedInsideInput && !clickedInsidePortal) {
//                 setShowSuggestions(false);
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []); // Refs son estables, no necesita dependencias

//     const addTag = (tag) => {
//         if (tag.trim() && !tags.includes(tag.trim()) && tags.length < maxTags) {
//             const newTags = [...tags, tag.trim()];
//             onChange({ target: { name, value: newTags } });
//         }
//         setInputValue('');
//         setShowSuggestions(false);
//     };

//     const removeTag = (tagToRemove) => {
//         const newTags = tags.filter(tag => tag !== tagToRemove);
//         onChange({ target: { name, value: newTags } });
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             e.preventDefault();
//             if (tags.length >= maxTags) return;
//             if (filteredSuggestions.length > 0) {
//                 addTag(filteredSuggestions[0]);
//             } else if (inputValue.trim()) {
//                 addTag(inputValue);
//             }
//         } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
//             removeTag(tags[tags.length - 1]);
//         }
//     };

//     const isAtLimit = tags.length >= maxTags;
//     let dynamicPlaceholder;
//     if (name === 'informado') {
//         dynamicPlaceholder = "Añadir Informados...";
//     } else if (isAtLimit) {
//         dynamicPlaceholder = "";
//     } else if (tags.length > 0) {
//         dynamicPlaceholder = "Añadir más...";
//     } else {
//         dynamicPlaceholder = placeholder;
//     }

//     return (
//         <div ref={wrapperRef} className="relative">
//             <div 
//                 className={`w-full flex flex-wrap items-center gap-2 px-3 py-2 text-sm bg-gray-50 border border-gray-400 rounded-md focus-within:outline-none focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/50 min-h-[40px] ${isAtLimit ? 'bg-gray-100' : ''}`}
//                 role="combobox"
//                 aria-expanded={showSuggestions && filteredSuggestions.length > 0 && !isAtLimit}
//             >
//                 {tags.map((tag) => (
//                     <span key={tag} className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
//                         {tag}
//                         <button 
//                             type="button" 
//                             onClick={() => removeTag(tag)}
//                             className="text-blue-600 hover:text-blue-800"
//                         >
//                             <X className="w-3 h-3" />
//                         </button>
//                     </span>
//                 ))}
//                 <input
//                     type="text"
//                     value={inputValue}
//                     onChange={handleInputChangeLocal}
//                     onKeyDown={handleKeyDown}
//                     onFocus={handleInputFocus}
//                     placeholder={dynamicPlaceholder}
//                     className="flex-grow bg-transparent text-sm p-0 border-none focus:ring-0 focus:outline-none"
//                     disabled={isAtLimit}
//                 />
//             </div>
            
//             {/* --- PORTAL RENDER --- */}
//             {showSuggestions && filteredSuggestions.length > 0 && !isAtLimit && createPortal(
//               <ul
//                 ref={el => { suggestionsRef.current = el; portalRef.current = el; }} // Asignar a ambas refs
//                 style={{ 
//                     position: 'fixed', 
//                     top: `${portalStyle.top}px`, 
//                     left: `${portalStyle.left}px`, 
//                     width: `${portalStyle.width}px`, 
//                     maxHeight: 160, 
//                     overflowY: 'auto' 
//                 }}
//                 className="z-[9999] bg-white border border-gray-300 rounded-md shadow-lg"
//                 role="listbox"
//               >
//                 {filteredSuggestions.map((suggestion) => (
//                   <li
//                     key={suggestion} // Key estable
//                     onClick={() => addTag(suggestion)}
//                     className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
//                     role="option"
//                   >
//                     {suggestion}
//                   </li>
//                 ))}
//               </ul>,
//               document.body
//             )}
//         </div>
//     );
// };

// --- Componente AutocompleteSearchField (para Dependencias) (Modificado) ---
const AutocompleteSearchField = ({ name, value, onChange, suggestionList = [], placeholder }) => {
    const [inputValue, setInputValue] = useState(value || ''); // El input ahora se sincroniza con el ID
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);
    const portalRef = useRef(null);
    const suggestionsRef = useRef(null);
    
    const [portalStyle, setPortalStyle] = useState({ top: 0, left: 0, minWidth: 0, opensUp: false });

    // Sincronizar el input con el valor (ID) que viene de props
    useEffect(() => {
       setInputValue(value || '');
    }, [value]);
    
    // Filtrar sugerencias
    const filteredSuggestions = useMemo(() => {
        // Si el input está vacío, mostrar todo
        if (inputValue.trim() === '') {
             return suggestionList.filter(item => item.id !== value); // No mostrar el ya seleccionado
        }
        
        // Si el input TIENE valor, filtrar por ID o Nombre
        return suggestionList.filter(
            item => 
                item.id !== value && (
                    item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
                    item.id.toLowerCase().includes(inputValue.toLowerCase())
                )
        );
    }, [inputValue, suggestionList, value]);

    // Lógica del Portal (Modificada)
    const positionPortal = useCallback(() => {
        if (!wrapperRef.current) return;
        const inputRect = wrapperRef.current.getBoundingClientRect();
        
        const itemHeight = 52; // Aprox 52px por item de dos líneas
        let estAltura = (filteredSuggestions.length || 1) * itemHeight;

        const espacioAbajo = window.innerHeight - inputRect.bottom;
        const abreArriba = espacioAbajo < estAltura && inputRect.top > estAltura;

        setPortalStyle({
            top: abreArriba ? (inputRect.top - estAltura - 4) : (inputRect.bottom + 4),
            left: inputRect.left,
            minWidth: inputRect.width, // Mínimo el ancho del input
            opensUp: abreArriba
        });
    }, [filteredSuggestions.length]);

    const handleInputFocus = () => {
        setShowSuggestions(true);
        setTimeout(positionPortal, 0);
    };

    const handleInputChangeLocal = (e) => {
        setInputValue(e.target.value);
        if (!showSuggestions) setShowSuggestions(true);
        // Si el usuario borra el input, se debe limpiar el valor
        if (e.target.value === '') {
            onChange({ target: { name, value: '' } });
        }
        setTimeout(positionPortal, 0);
    };

    useEffect(() => {
        if (!showSuggestions) return;
        positionPortal();
        const onScroll = () => positionPortal();
        const onResize = () => positionPortal();
        window.addEventListener('scroll', onScroll, true);
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('scroll', onScroll, true);
            window.removeEventListener('resize', onResize);
        };
    }, [showSuggestions, positionPortal]);

    useEffect(() => {
        function handleClickOutside(e) {
            const clickedInsideInput = wrapperRef.current?.contains(e.target);
            const clickedInsidePortal = portalRef.current?.contains(e.target);
            if (!clickedInsideInput && !clickedInsidePortal) {
                setShowSuggestions(false);
                // Si se cierra sin seleccionar, resetear input al valor (ID) actual
                setInputValue(value || '');
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [value]);
    
    // Seleccionar un item
    const selectItem = (item) => {
        setInputValue(item.id); // Mostrar ID en input
        onChange({ target: { name, value: item.id } }); // Guardar ID
        setShowSuggestions(false);
    };
    
    // Sincronizar el texto del input al valor actual cuando se desenfoca
    const handleBlur = () => {
         setTimeout(() => {
            if (!showSuggestions) { // Solo si el portal no está abierto
                setInputValue(value || ''); // Resetear al ID
            }
         }, 150); // Pequeño delay para permitir el click
    };

    return (
        <div ref={wrapperRef} className="relative w-full">
             <input
                type="text"
                value={inputValue}
                onChange={handleInputChangeLocal}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50"
                role="combobox"
                aria-expanded={showSuggestions && filteredSuggestions.length > 0}
            />
            
            {showSuggestions && filteredSuggestions.length > 0 && createPortal(
              <ul
                ref={el => { suggestionsRef.current = el; portalRef.current = el; }}
                style={{ 
                    position: 'fixed', 
                    top: `${portalStyle.top}px`, 
                    left: `${portalStyle.left}px`, 
                    minWidth: `${portalStyle.minWidth}px`, 
                    width: 'max-content' // Se expande al contenido
                    // Sin maxHeight y sin overflowY
                }}
                className="z-[9999] bg-white border border-gray-300 rounded-md shadow-lg"
                role="listbox"
              >
                {filteredSuggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => selectItem(item)}
                    className="px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 whitespace-nowrap"
                    role="option"
                  >
                    <span className="block font-bold text-gray-900">{item.id}</span>
                    <span className="block text-gray-600">{item.name}</span>
                  </li>
                ))}
              </ul>,
              document.body
            )}
        </div>
    );
};


// --- Panel de Selección (Izquierda) ---
const LambdaSelectionPanel = ({ tasksData, onSelectSubtask, selectedSubtask, handleAddNewSubtask, handleAddTask, procesoN2 }) => {
    const [openTaskId, setOpenTaskId] = useState(tasksData.tasks[0]?.id);
    const [isAddingTask, setIsAddingTask] = useState(false);
    
    const onSaveTask = (newTaskData) => {
        handleAddTask(newTaskData);
        setIsAddingTask(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col border-l border-b border-gray-200 h-[calc(100vh-8rem)]">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-gray-800">{procesoN2 ? `${procesoN2.id} ${procesoN2.label}` : 'Procesos N3'}</h2>
                </div>
            </div>
            <div className="space-y-2 flex-grow overflow-y-auto pr-2">
                {tasksData.tasks.map(task => (
                    <div key={task.id} className="bg-white rounded-lg shadow-sm border border-l-4 border-l-orange-500">
                        <button onClick={() => {
                            setOpenTaskId(openTaskId === task.id ? null : task.id);
                        }} className="w-full p-3 border-b border-gray-100 text-left">
                           <h3 className="font-bold text-gray-800 flex items-start gap-2">
                                <span className="text-xs px-2 py-0.5 bg-gray-300 text-gray-800 rounded font-medium whitespace-nowrap mt-1">{task.id}</span>
                                <span>{task.name}</span>
                           </h3>
                           <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-md mt-1">{task.description}</p>
                        </button>
                        <div className={`transition-all duration-500 ease-in-out grid ${openTaskId === task.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <div className="overflow-hidden">
                                <div className="p-3 space-y-2">
                                    <div className="mt-1 pl-2 pt-1 space-y-1">
                                        {task.subtasks.map(subtask => (
                                            <div key={subtask.id} className={`group w-full rounded-md flex items-center justify-between text-xs transition-colors ${selectedSubtask === subtask.id ? 'bg-orange-100' : 'hover:bg-gray-100'}`}>
                                                <button onClick={() => onSelectSubtask(subtask.id)} className={`flex-grow text-left p-2 flex items-center gap-2 ${selectedSubtask === subtask.id ? 'font-semibold' : ''}`}>
                                                    <FilePenLine size={14} className="text-gray-600" />
                                                    <span className="flex-grow">{subtask.name}</span>
                                                </button>
                                            </div>
                                        ))}
                                        <button onClick={() => handleAddNewSubtask(task.id)} className="w-full text-left p-2 rounded-md flex items-center gap-2 text-xs text-orange-600 hover:bg-orange-50">
                                            <PlusCircle size={14} /> Nueva Actividad
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {isAddingTask ? (
                <AddNewTaskForm onSave={onSaveTask} onCancel={() => setIsAddingTask(false)} />
            ) : (
                <div className="pt-4 mt-auto border-t">
                     <button onClick={() => setIsAddingTask(true)} className="w-full text-center p-2 rounded-md flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-colors">
                        <PlusCircle size={16} /> Añadir SubProceso
                    </button>
                </div>
            )}
        </div>
    );
};

// --- Componentes Display para modo lectura ---
const TagListDisplay = ({ tags, placeholder, color = 'blue' }) => {
    const colorConfig = {
        blue: 'bg-blue-100 text-blue-800',
        orange: 'bg-orange-100 text-orange-800',
        green: 'bg-green-100 text-green-800'
    };
    const tagClass = colorConfig[color] || colorConfig.blue;
    
    // Asegurarse de que 'tags' es un array
    const tagArray = Array.isArray(tags) ? tags : (tags ? [tags] : []);

    if (tagArray.length === 0) {
        return <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px] text-gray-400">{placeholder}</p>;
    }
    return (
        <div className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px] flex flex-wrap gap-2 items-center">
            {tagArray.map((tag, index) => (
                <span key={index} className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${tagClass}`}>
                    {tag}
                </span>
            ))}
        </div>
    );
};

// --- Componente Display para Viñetas ---
const BulletedDisplayField = ({ text, placeholder = "N/A" }) => {
    const items = useMemo(() => {
        if (!text || text.trim() === '') return [];
        return text.split('\n').filter(line => line.trim() !== '');
    }, [text]);

    if (items.length === 0) {
        return <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px] text-gray-400">{placeholder}</p>;
    }

    return (
        <div className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">
            <ul className="space-y-1 text-gray-800">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-600 mt-0.5"></span>
                        <span className="flex-1">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const RecommendationsModal = ({ content, onClose }) => {
    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4 animate-fade-in">
             <style>{`.animate-fade-in { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all" >
                 <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <AlertCircle className="text-orange-500" size={20}/>
                        Recomendaciones
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                        <X size={16} />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-700">{content || "No hay recomendaciones disponibles."}</p>
                </div>
                 <div className="p-4 bg-gray-50 border-t border-gray-200 text-right rounded-b-xl">
                     <button onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Entendido
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

// --- Modal de Dependencia (Modificado) ---
const DependencyModal = ({ dependency, onClose }) => {
    if (!dependency) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998] flex items-center justify-center p-4 animate-fade-in">
             <style>{`.animate-fade-in { animation: fadeIn 0.3s ease-out; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full transform transition-all">
                 <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                    {/* Título y ID en la misma línea */}
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-sm font-medium">{dependency.id}</span>
                        <span>{dependency.name}</span>
                    </h3>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => alert(`Navegando a la página de ${dependency.id}...`)} 
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-orange-500"
                            title="Abrir en nueva página"
                        >
                            <ExternalLink size={18} />
                        </button>
                        <button 
                            onClick={onClose} 
                            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                            title="Cerrar"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
                
                <div className="p-6 space-y-4">
                    {/* ID removido de aquí */}
                    <InfoField label="Descripción Detallada">
                        <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{dependency.descripcionDetallada}</p>
                    </InfoField>

                    <div className="grid grid-cols-2 gap-4">
                        <InfoField label="Responsable (R)">
                           <TagListDisplay tags={dependency.responsable} placeholder="N/A" color="blue"/>
                        </InfoField>
                        <InfoField label="Accountable (A)">
                           <TagListDisplay tags={dependency.accountable} placeholder="N/A" color="blue"/>
                        </InfoField>
                    </div>
                </div>
                 
                 <div className="p-4 bg-gray-50 border-t border-gray-200 text-right rounded-b-xl">
                     <button onClick={onClose} className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-md hover:bg-orange-600">
                        Cerrar
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};


// --- Helper para campos de detalle ---
const InfoField = ({ label, children, className = "" }) => (
    <div className={className}>
        <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
        <div className="text-sm text-gray-800">{children}</div>
    </div>
);


// --- Formulario de Detalles (Derecha) ---
const LambdaDetailForm = ({ subtaskData, allSubtaskDetails, allActivitiesList, handleUpdateSubtask, isEditMode, setIsEditMode, isPanelCollapsed, setIsPanelCollapsed }) => {
    const [formData, setFormData] = useState(subtaskData);
    const [openSection, setOpenSection] = useState('P1'); // Default open P1
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [showRecommendationsModal, setShowRecommendationsModal] = useState(false);
    const [showDependencyModal, setShowDependencyModal] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const clasificacionClass = useMemo(() => {
        const clasificacion = formData?.clasificacion || '';
        switch (clasificacion.toLowerCase()) {
            case 'sop':
                return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900';
            case 'guia tecnica':
                return 'bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900';
            case 'runbook':
                return 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 hover:text-indigo-900';
            case 'playbook':
                return 'bg-pink-100 text-pink-800 hover:bg-pink-200 hover:text-pink-900';
            case 'kba':
                return 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 hover:text-cyan-900';
            default:
                return 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900';
        }
    }, [formData?.clasificacion]);

    // Buscar los detalles de la dependencia
    const dependencyDetails = useMemo(() => {
        if (formData?.dependencia && allSubtaskDetails) {
            return allSubtaskDetails[formData.dependencia];
        }
        return null;
    }, [formData?.dependencia, allSubtaskDetails]);

    const handleToggleSection = (sectionTitle) => {
        setOpenSection(prevOpenSection => 
            prevOpenSection === sectionTitle ? null : sectionTitle
        );
    };

    useEffect(() => {
        setFormData(subtaskData);
        if (subtaskData && subtaskData.id.startsWith('new-')) {
            setOpenSection('P1'); // Open P1 for new items
        }
        setIsEditingTitle(false);
    }, [subtaskData]);

    useEffect(() => {
        if (!isEditMode) {
            setIsEditingTitle(false);
        }
    }, [isEditMode]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        handleUpdateSubtask(newFormData);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Simulación de guardado
            await new Promise(resolve => setTimeout(resolve, 500));
            alert('✅ Cambios guardados exitosamente');
            setIsEditMode(false);
        } catch (error) {
            console.error('Error guardando:', error);
            alert('❌ Error al guardar cambios');
        } finally {
            setIsSaving(false);
        }
    };

    if (!formData) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8 flex items-center justify-center h-full border-l border-b border-gray-200">
                <p className="text-gray-500">Seleccione una actividad para ver sus detalles.</p>
            </div>
        );
    }
    
    const isNewActivity = formData.id.startsWith('new-');

    return (
        <> {/* Fragmento para permitir que los modales existan al mismo nivel */}
            <div className="bg-white rounded-xl shadow-md flex flex-col border-l border-b border-gray-200">
                {/* Cabecera Fija */}
                <div className="p-6 border-b border-gray-200 bg-white">
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow">
                             {isNewActivity || (isEditMode && isEditingTitle) ? (
                                <div className="flex items-center gap-3">
                                    <div className="flex-grow">
                                        <InputField label="" name="name" placeholder="Nombre de la Actividad" value={formData.name} onChange={handleInputChange} onBlur={() => setIsEditingTitle(false)} />
                                    </div>
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-medium">{formData.id}</span>
                                </div>
                            ) : (
                                <div onClick={() => isEditMode && setIsEditingTitle(true)} className={`flex items-center gap-3 rounded-md ${isEditMode ? 'cursor-pointer hover:bg-gray-100 p-2 -m-2' : 'p-2 -m-2'}`}>
                                    <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
                                    <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-medium">{formData.id}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex-shrink-0 ml-4 flex items-center gap-4">
                            <button
                                onClick={() => setIsEditMode(!isEditMode)}
                                className={`flex items-center gap-2 text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-200 ${
                                    isEditMode 
                                    ? 'bg-orange-100 text-orange-800 ring-2 ring-orange-300' 
                                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                }`}
                            >
                                {isEditMode ? 'Editando' : 'Editar'}
                                <Pencil size={14}/>
                            </button>
                            <button 
                                onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
                                className="p-1 text-gray-500 hover:text-orange-500 hover:bg-gray-100 rounded-md"
                                title={isPanelCollapsed ? "Mostrar panel" : "Ocultar panel"}
                            >
                                {isPanelCollapsed ? <PanelLeftOpen size={28} /> : <PanelLeftClose size={28} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2 text-sm">
                        {/* Left side: Dependencias (Modificado) */}
                        <div className="flex items-center gap-2 w-2/5">
                            <span className="font-semibold text-gray-700 flex-shrink-0">Dependencia:</span>
                            {isEditMode ? (
                                <AutocompleteSearchField
                                    name="dependencia"
                                    value={formData.dependencia}
                                    onChange={handleInputChange}
                                    suggestionList={allActivitiesList}
                                    placeholder="Buscar ID o Título..."
                                />
                            ) : (
                                <button 
                                    onClick={() => dependencyDetails && setShowDependencyModal(true)}
                                    disabled={!dependencyDetails}
                                    className={`truncate px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-xs font-semibold transition-colors ${dependencyDetails ? 'cursor-pointer hover:bg-orange-200 hover:text-orange-900' : 'cursor-not-allowed opacity-70'}`}
                                    title={formData.dependencia || 'N/A'}
                                >
                                    {formData.dependencia || 'N/A'}
                                </button>
                            )}
                        </div>
                        
                        {/* Right side: R, SOP, Time (Modificado) */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-700">R:</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-semibold">
                                    {formData.responsable || 'N/A'}
                                </span>
                            </div>
                            
                            {isEditMode ? (
                                <div className="w-32">
                                    <SelectField 
                                        name="clasificacion"
                                        value={formData.clasificacion}
                                        onChange={handleInputChange}
                                        options={CLASIFICACION_OPTIONS}
                                    />
                                </div>
                            ) : (
                                <div className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors cursor-pointer ${clasificacionClass}`} title={formData.clasificacion || 'N/A'}>
                                    {formData.clasificacion || 'N/A'}
                                </div>
                            )}

                            <div className="flex items-center gap-1 text-gray-600">
                                <Clock size={14} />
                                <span>{formData.duracion || 'N/A'} min</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Contenido con Scroll (Sin overflow-y-auto) */}
                <div className="flex-grow bg-white">
                    <CollapsibleSection
                        title="Descripcion Detallada"
                        isOpen={openSection === 'P1'}
                        onToggle={() => handleToggleSection('P1')}
                    >
                        <InfoField label="Descripción Detallada">
                            {isEditMode ? <TextAreaField name="descripcionDetallada" value={formData.descripcionDetallada} onChange={handleInputChange} /> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.descripcionDetallada}</p>}
                        </InfoField>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <InfoField label="Entradas/Pre-requisitos">
                                {isEditMode ? <TextAreaField name="entradas" value={formData.entradas} onChange={handleInputChange} /> : <BulletedDisplayField text={formData.entradas} placeholder="No hay entradas." />}
                            </InfoField>
                            <InfoField label="Salidas/Evidencia">
                                {isEditMode ? <TextAreaField name="salidas" value={formData.salidas} onChange={handleInputChange} /> : <BulletedDisplayField text={formData.salidas} placeholder="No hay salidas." />}
                            </InfoField>
                        </div>
                        <InfoField label="Criterio de Finalización" className="mt-4">
                            {isEditMode ? <TextAreaField name="criterio" value={formData.criterio} onChange={handleInputChange} /> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.criterio}</p>}
                        </InfoField>
                    </CollapsibleSection>

                    <CollapsibleSection
                        title="Gestion y Roles (RACI)"
                        isOpen={openSection === 'P2'}
                        onToggle={() => handleToggleSection('P2')}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <InfoField label="Responsable (R)">
                                {isEditMode ? <InputField name="responsable" value={formData.responsable} onChange={handleInputChange} placeholder="Responsable..."/> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.responsable || 'N/A'}</p>}
                            </InfoField>
                            <InfoField label="Accountable (A)">
                                {isEditMode ? <InputField name="accountable" value={formData.accountable} onChange={handleInputChange} placeholder="Accountable..."/> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.accountable || 'N/A'}</p>}
                            </InfoField>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <InfoField label="Consultado (C)">
                                {isEditMode ? <InputField name="consultado" value={formData.consultado} onChange={handleInputChange} placeholder="Consultado..."/> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.consultado || 'N/A'}</p>}
                            </InfoField>
                            <InfoField label="Owner (O)">
                                {isEditMode ? <InputField name="owner" value={formData.owner} onChange={handleInputChange} placeholder="Owner..."/> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.owner || 'N/A'}</p>}
                            </InfoField>
                        </div>
                        <InfoField label="Informado (I)" className="mt-4">
                            {isEditMode ? <InputField name="informado" value={formData.informado} onChange={handleInputChange} placeholder="Informado..."/> : <p className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md min-h-[40px]">{formData.informado || 'N/A'}</p>}
                        </InfoField>
                    </CollapsibleSection>

                    {/* Sección de Métricas Modificada */}
                    <CollapsibleSection
                        title="Metricas e Indicadores"
                        isOpen={openSection === 'P3'}
                        onToggle={() => handleToggleSection('P3')}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <InfoField label="KPIs (Indicadores Clave de Desempeño)">
                                {isEditMode ? 
                                    <TextAreaField name="kpis" value={formData.kpis} onChange={handleInputChange} placeholder="Escriba un KPI y presione Enter..."/> : 
                                    <BulletedDisplayField text={formData.kpis} placeholder="No hay KPIs definidos." />
                                }
                            </InfoField>
                            <InfoField label="KRIs (Indicadores Clave de Riesgo)">
                                {isEditMode ? 
                                    <TextAreaField name="kris" value={formData.kris} onChange={handleInputChange} placeholder="Escriba un KRI y presione Enter..."/> : 
                                    <BulletedDisplayField text={formData.kris} placeholder="No hay KRIs definidos." />
                                }
                            </InfoField>
                        </div>
                    </CollapsibleSection>
                </div>

                {/* Pie de Página Fijo */}
                <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end items-center gap-3">
                    <button onClick={() => setIsEditMode(false)} className="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">Cancelar</button>
                    <button disabled={!isEditMode} className="px-4 py-2 text-sm font-semibold bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed">Enviar a Revisión</button>
                    <button onClick={handleSave} disabled={!isEditMode || isSaving} className="px-4 py-2 text-sm font-semibold bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                </div>
            </div>

            {/* Renderizar Modales */}
            {showDependencyModal && (
                <DependencyModal 
                    dependency={dependencyDetails} 
                    onClose={() => setShowDependencyModal(false)}
                />
            )}

            {showRecommendationsModal && (
                <RecommendationsModal 
                    content={"Recomendación de ejemplo..."} 
                    onClose={() => setShowRecommendationsModal(false)}
                />
            )}
        </>
    );
};


// --- Componente Principal ---
export default function OrganizacionTable() {
    const [tasksData, setTasksData] = useState({ tasks: [], subtaskDetails: {} });
    const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
    const [selectedSubtask, setSelectedSubtask] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isLoadingActivities, setIsLoadingActivities] = useState(true);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [procesoN2Info, setProcesoN2Info] = useState(null);

    // Cargar actividades al montar
    useEffect(() => {
        setIsLoadingActivities(false);
        
        // Escuchar evento de inicio de búsqueda
        const handleSearchStarted = () => {
            setTasksData({ tasks: [], subtaskDetails: {} });
            setSelectedSubtask(null);
            setIsLoadingActivities(true);
        };
        
        // Escuchar evento de resultados de búsqueda
        const handleSearchResults = (event) => {
            const { subprocesos, procesoN2 } = event.detail || {};
            
            if (!subprocesos || !Array.isArray(subprocesos)) return;
            
            const transformedData = {
                tasks: subprocesos.map(sp => ({
                    id: sp.id,
                    name: sp.label,
                    description: sp.description || 'Sin descripción',
                    subtasks: (sp.actividades || []).map(act => ({
                        id: act.id,
                        name: act.label
                    }))
                })),
                subtaskDetails: {}
            };
            
            setTasksData(transformedData);
            setProcesoN2Info(procesoN2);
            setIsLoadingActivities(false);
        };
        
        window.addEventListener('search-started', handleSearchStarted);
        window.addEventListener('search-results', handleSearchResults);
        return () => {
            window.removeEventListener('search-started', handleSearchStarted);
            window.removeEventListener('search-results', handleSearchResults);
        };
    }, []);

    const handleSelectSubtask = async (subtaskId) => {
        setSelectedSubtask(subtaskId);
        setIsEditMode(false);
        
        if (!tasksData.subtaskDetails[subtaskId]) {
            setIsLoadingDetails(true);
            const { actividadDetails } = await import('../../data');
            const details = actividadDetails[subtaskId];
            
            if (details) {
                setTasksData(currentData => ({
                    ...currentData,
                    subtaskDetails: {
                        ...currentData.subtaskDetails,
                        [subtaskId]: details
                    }
                }));
            }
            setIsLoadingDetails(false);
        }
    };

    const handleAddNewTask = (newTaskData) => { // newTaskData is { name, description }
        setTasksData(currentData => {
            
            const baseId = 'DS-SPROC-05.';
            let maxId = 0;
            
            currentData.tasks.forEach(task => {
                if (task.id.startsWith(baseId)) {
                    const idNum = parseInt(task.id.split('.').pop(), 10);
                    if (!isNaN(idNum) && idNum > maxId) {
                        maxId = idNum;
                    }
                }
            });
            
            const newId = `${baseId}${maxId + 1}`;

            const newTask = {
                id: newId,
                name: newTaskData.name,
                description: newTaskData.description, // Use description from form
                subtasks: []
            };
            
            const newTasks = [...currentData.tasks, newTask];
            return { ...currentData, tasks: newTasks };
        });
    };

    // --- MODIFICADO: handleAddNewSubtask ---
    const handleAddNewSubtask = (taskId) => {
        // 1. Encontrar la tarea y determinar el nuevo ID y Nombre primero.
        const task = tasksData.tasks.find(t => t.id === taskId);
        if (!task) return;

        const lastSubtask = task.subtasks[task.subtasks.length - 1];
        let nextNum = 1;

        if (lastSubtask) {
            try {
                // Asume formato "TASKID-A##"
                const idParts = lastSubtask.id.split('-A');
                const lastNum = parseInt(idParts[idParts.length - 1], 10);
                if (!isNaN(lastNum)) {
                    nextNum = lastNum + 1;
                }
            } catch (e) {
                console.error("Error al parsear el ID de la última sub-tarea", e);
                // Fallback si el formato falla
                nextNum = task.subtasks.length + 1; 
            }
        }

        const newNumStr = String(nextNum).padStart(2, '0');
        const newId = `${taskId}-A${newNumStr}`;
        const newName = `Actividad ${newNumStr}`; // Nombre correlativo

        const newSubtask = {
            id: newId,
            name: newName,
        };

        // 2. Actualizar el estado
        setTasksData(currentData => {
            const newData = JSON.parse(JSON.stringify(currentData)); 
            const taskIndex = newData.tasks.findIndex(t => t.id === taskId);
            if (taskIndex !== -1) {
                newData.tasks[taskIndex].subtasks.push(newSubtask);
            }
            return newData;
        });

        // 3. Establecer selección y modo de edición
        setSelectedSubtask(newId);
        setIsEditMode(true);
    };


    // autoCloseTask: Setea en true para auto cerrar el subproceso cuando todas las actividades estén finalizadas

    const handleUpdateSubtask = (updatedSubtaskData) => {
        setTasksData(currentData => {
            const newData = JSON.parse(JSON.stringify(currentData));
            
            const task = newData.tasks.find(t => t.subtasks.some(st => st.id === updatedSubtaskData.id));
            if (task) {
                const subtaskIndex = task.subtasks.findIndex(st => st.id === updatedSubtaskData.id);
                if (subtaskIndex !== -1) {
                    task.subtasks[subtaskIndex].name = updatedSubtaskData.name;
                }
            }

            newData.subtaskDetails[updatedSubtaskData.id] = updatedSubtaskData;
            
            return newData;
        });
    };
    
    // --- NUEVO: Lista de todas las actividades para el buscador de dependencias ---
    const allActivitiesList = useMemo(() => {
        return tasksData.tasks.flatMap(task => 
            task.subtasks.map(subtask => ({
                id: subtask.id,
                name: subtask.name
            }))
        );
    }, [tasksData.tasks]);


    const subtaskDetails = useMemo(() => {
        if (!selectedSubtask) return null;

        let parentId = null;
        tasksData.tasks.forEach(task => {
            if (task.subtasks.some(st => st.id === selectedSubtask)) {
                parentId = task.id;
            }
        });
        
        const allSubtasks = tasksData.tasks.flatMap(t => t.subtasks);
        const selectedSubtaskInfo = allSubtasks.find(st => st.id === selectedSubtask);
        
        const existingDetails = tasksData.subtaskDetails[selectedSubtask];

        if (existingDetails) {
            return existingDetails;
        }
        
        // Asignar el nombre correlativo correcto a la plantilla
        const newName = selectedSubtaskInfo?.name || 'Nueva Actividad';

        // Template para nueva actividad (Modificado)
        return {
            id: selectedSubtask,
            name: newName,
            parentTaskId: parentId,
            dependencia: '',
            descripcionDetallada: '',
            entradas: '',
            salidas: '',
            criterio: '',
            clasificacion: 'SOP',
            duracion: '0',
            responsable: '',
            accountable: '',
            owner: '',
            consultado: '',
            informado: '',
            kpis: '',
            kris: '' // Añadido
        };
    }, [selectedSubtask, tasksData]);


    if (isLoadingActivities) {
        return (
            <div className="p-2 lg:px-6 font-sans">
                <div className="max-w-screen flex">
                    <div className="w-1/3 pr-6">
                        <div className="bg-white rounded-xl shadow-md p-4 border-l border-b border-gray-200 h-[calc(100vh-8rem)]">
                            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                            <div className="space-y-2">
                                {[1,2,3,4,5].map(i => (
                                    <div key={i} className="bg-white rounded-lg shadow-sm border border-l-4 border-l-gray-300 p-3">
                                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="bg-white rounded-xl shadow-md border-l border-b border-gray-200 h-[calc(100vh-8rem)]">
                            <div className="p-6 border-b border-gray-200">
                                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                                    <div className="flex gap-4">
                                        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                                        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {[1,2,3].map(i => (
                                    <div key={i}>
                                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-2 lg:px-6 font-sans">
            <div className="max-w-screen  flex">
                <div className={`flex-shrink-0 transition-all duration-[600ms] ease-in-out ${isPanelCollapsed ? 'w-0' : 'w-1/3'}`}>
                    <div className="overflow-hidden">
                        <LambdaSelectionPanel 
                            tasksData={tasksData}
                            selectedSubtask={selectedSubtask}
                            onSelectSubtask={handleSelectSubtask}
                            handleAddNewSubtask={handleAddNewSubtask}
                            handleAddTask={handleAddNewTask}
                            procesoN2={procesoN2Info}
                        />
                    </div>
                </div>
                <div className={`flex-grow transition-all duration-[600ms] ease-in-out ${isPanelCollapsed ? 'pl-0' : 'pl-6'}`}>
                    {isLoadingDetails ? (
                        <div className="bg-white rounded-xl shadow-md border-l border-b border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="flex justify-between">
                                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                                    <div className="flex gap-4">
                                        <div className="h-4 w-20 bg-gray-100 rounded animate-pulse"></div>
                                        <div className="h-4 w-16 bg-gray-100 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                {[1,2,3].map(i => (
                                    <div key={i}>
                                        <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <LambdaDetailForm 
                        subtaskData={subtaskDetails} 
                        allSubtaskDetails={tasksData.subtaskDetails} // Pasar todos los detalles
                        allActivitiesList={allActivitiesList} // Pasar lista para buscador
                        handleUpdateSubtask={handleUpdateSubtask}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                        isPanelCollapsed={isPanelCollapsed}
                        setIsPanelCollapsed={setIsPanelCollapsed}
                    />
                    )}
                </div>
            </div>
        </div>
    );
}