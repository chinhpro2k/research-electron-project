import React, { useEffect, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { Button, Input, message } from 'antd';
interface IProps {
  handleResearch: (value: string) => void;
}
const KeyboardLayout = (props: IProps) => {
  const [input, setInput] = useState('');
  const [layout, setLayout] = useState('default');
  const keyboard = useRef();
  const [isShowKeyboard, setIsShowKeyboard] = useState<boolean>(false);
  const keyboardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('click', handleClickOutSide);
    return () => {
      window.removeEventListener('click', handleClickOutSide);
    };
  }, []);
  const handleClickOutSide = (e: any) => {
    const node = keyboardRef.current;
    const { target } = e;
    if (node) {
      if (!node.contains(target)) {
        setIsShowKeyboard(false);
        setInput('');
      }
    }
  };
  const onChange = (input: any) => {
    setInput(input);
    // console.log('Input changed', input);
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = (button: any) => {
    // console.log('Button pressed', button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const onChangeInput = (event: any) => {
    const input = event.target.value;
    setInput(input);
    // @ts-ignore
    keyboard.current.setInput(input);
  };
  const handleClick = () => {
    console.log('run');
    setIsShowKeyboard(true);
  };
  const handleResearch = () => {
    console.log('input', input);
    props.handleResearch(input);
  };
  return (
    <div
      style={{
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      ref={keyboardRef}
    >
      {/*<input*/}
      {/*  value={input}*/}
      {/*  placeholder={'Tap on the virtual keyboard to start'}*/}
      {/*  onChange={onChangeInput}*/}
      {/*/>*/}
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}
      >
        <Input
          style={{ width: '500px' }}
          value={input}
          placeholder={'Nhập mã tra cứu'}
          size={'large'}
          onClick={() => handleClick()}
          onChange={onChangeInput}
        />
        <Button
          type="primary"
          // htmlType="submit"
          onClick={() => handleResearch()}
          style={{ marginLeft: '18px' }}
        >
          Tra cứu
        </Button>
      </div>
      {isShowKeyboard && (
        <div style={{ minWidth: '1000px' }}>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
        </div>
      )}
    </div>
  );
};

export default KeyboardLayout;
