import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useNavigate } from 'react-router-dom'; 
import { signUp } from '../api/Auth';

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : name === 'birthdate' ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }
      const { confirmPassword, ...registerData } = formData;

      const response = await signUp(registerData);

      console.log('Registration successful:', response);
      navigate('/signup/success');
    } catch (error) {
      console.error('회원가입 중 에러 발생:', error.message);
    }
  };

  return (
    <>
      <Header />
      <Title>회원가입</Title>
      <Container>
        <SignUpForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>이메일</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>닉네임</Label>
            <Input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="닉네임을 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>비밀번호 확인</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>전화번호</Label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="전화번호를 입력하세요"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>생년월일</Label>
            <Input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Checkbox
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <CheckboxLabel>
            서비스 이용 약관에 동의합니다.
            </CheckboxLabel>
          </FormGroup>
          <Button type="submit">회원가입</Button>
        </SignUpForm>
      </Container>
      <Footer />
    </>
  );
};

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 50px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 940px;
  border-radius: 20px;
  border: 1px solid #ccc;
  padding: 40px;
  position: relative;
  margin: 50px auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const SignUpForm = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #C8256A;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
`;

export default SignUpPage;
