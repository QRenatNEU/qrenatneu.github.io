import {useEffect, useState} from "react";

const formStyle = {
    maxWidth: '800px',
    maxHeight: '480px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    overflowY: 'auto',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const formGroupStyle = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'row',
    columnGap: '6px',
    justifyContent: 'center',
    alignItems: 'center'
};

const inputStyle = {
    width: '25%',
    height: '36px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
};

const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

export default function Form({itemList, setItemList}) {

    const [filter, setFilter] = useState([]);
    const [selection, setSelection] = useState([]);
    const [singleSelect, setSingleSelect] = useState(true);

    useEffect(() => {
        setSelection([]);
    }, [singleSelect])

    function makeSelection(item) {
        console.log(item)
        if (singleSelect) {
            setSelection([item])
        } else {
            // const findif = selection.filter(sel => sel.id === item.id);
            if (selection.find(sel => sel.id === item.id)) {
                // find, remove
                setSelection(selection.filter(sel => sel.id !== item.id));
            } else {
                // add
                console.log([...selection, item])
                setSelection([...selection, item])
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(e);

        // const formData = new FormData(e.target);
        console.log('aaaaa', e.target[1].name)
        // console.log(typeof e.target[1]);

        const tmp = []
        let tmp2 = {}
        let id = 0;

        Object.keys(e.target).forEach(key => {
            const tgt = e.target[key];
            // console.log(tgt);
            if (!tgt.name) {
                return;
            }
            if (tgt.name.startsWith('inputType')) {
                if (Object.keys(tmp2).length > 1) {
                    tmp.push({id, ...tmp2});
                    tmp2 = {}
                    id ++;
                }
            }
            tmp2[tgt.name] = tgt.value;
        })
        // last
        if (Object.keys(tmp2).length > 1) {
            tmp.push({id, ...tmp2});
        }
        setItemList(tmp);
    }

    return <div>
        <div style={{fontWeight: 'bold'}}>Make a selection to enable edit...</div>
        <form onSubmit={handleSubmit}>
            <div style={formStyle}>
                {
                    itemList.length > 0 ? (
                        itemList.map((user, idx) => {
                            // console.log(user.id);
                            // console.log(selection)

                            if (filter.length > 0 && !filter.includes(user)) {
                                return <></>;
                            }

                            return <div style={{
                                ...formGroupStyle,
                                // backgroundColor: selection.includes(user) ? 'transparent' : 'lightgreen'
                            }} key={`formItem${idx}`}>
                                <input
                                    type={singleSelect ? 'radio' : 'checkbox'}
                                    name={`inputType-${user.id}`}
                                    checked={selection.includes(user)}
                                    // checked={selection.some(sel => sel.id === user.id)}
                                    onClick={(e) => {
                                        makeSelection(user)
                                    }}
                                    onChange={() => {
                                    }}
                                />
                                <label htmlFor={`name ${idx}`}>Name</label>
                                <textarea style={inputStyle} rows={1} key={`name ${idx}`} id={`name ${idx}`} name={'name'}
                                          readOnly={!selection.includes(user)}
                                          value={`${user.name}`}
                                onChange={(e) => {
                                    const els = itemList.filter(item => item.id !== user.id);
                                    user.name = e.target.value;
                                    setItemList((itemList) => {
                                        const ls = [...els, user];
                                        console.log(ls);
                                        ls.sort((a,b) => a.id - b.id);
                                        console.log(ls);
                                        return ls;
                                    });
                                }}></textarea>
                                <label htmlFor={`email ${idx}`}>Email</label>
                                <textarea style={inputStyle} key={`email ${idx}`} rows={1} id={`email ${idx}`} name={'email'}
                                          readOnly={!selection.includes(user)}
                                          value={`${user.email}`}
                                          onChange={(e) => {
                                              const els = itemList.filter(item => item.id !== user.id);
                                              user.email = e.target.value;
                                              setItemList((itemList) => {
                                                  const ls = [...els, user];
                                                  console.log(ls);
                                                  ls.sort((a,b) => a.id - b.id);
                                                  console.log(ls);
                                                  return ls;
                                              });
                                          }}
                                ></textarea>
                                <label htmlFor={`age ${idx}`}>Age</label>
                                <textarea style={inputStyle} rows={1} key={`age ${idx}`} id={`age ${idx}`} name={'age'}
                                          readOnly={!selection.includes(user)}
                                          value={`${user.age}`}
                                          onChange={(e) => {
                                              const els = itemList.filter(item => item.id !== user.id);
                                              user.age = e.target.value;
                                              setItemList((itemList) => {
                                                  const ls = [...els, user];
                                                  console.log(ls);
                                                  ls.sort((a,b) => a.id - b.id);
                                                  console.log(ls);
                                                  return ls;
                                              });
                                          }}
                                ></textarea>
                            </div>
                        })
                    ) : <div>No Item</div>
                }
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'row',
                columnGap: '12px',
                justifyContent: 'center',
                marginTop: '12px'
            }}>
                <button onClick={() => {
                    const toAdd = {
                        id: -itemList.length,
                        name: '',
                        email: '',
                        age: 0
                    };
                    setItemList([toAdd, ...itemList]);
                    setSelection([toAdd]);
                }} type={'button'} style={buttonStyle}>Add User</button>
                <button type={'button'} style={buttonStyle} onClick={() => {
                    const res = window.prompt('enter user id');
                    console.log(res)
                    const find = itemList.filter(item => `${item.id}` == res);
                    if (!find || find.length < 1) {
                        window.alert('not found!');
                    }
                    setFilter(find);
                }}>Find User</button>
                <button type={'button'} onClick={() => {
                    // console.log(selection, itemList.filter(item => !selection.includes(item)));
                    setItemList(itemList.filter(item => !selection.includes(item)))}
                } style={buttonStyle}>Remove User</button>
                {singleSelect
                    ? <button type={'button'} style={buttonStyle} onClick={() => setSingleSelect(false)}>Multi Select</button>
                    : <button type={'button'} style={buttonStyle} onClick={() => setSingleSelect(true)}>Single Select</button>}
                <button type={"submit"} style={buttonStyle}>Save & Submit</button>
            </div>
        </form>
    </div>
}