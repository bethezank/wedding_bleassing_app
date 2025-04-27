import './output.css'

import React, { useState, useEffect } from 'react';
import {
  Layout,
  Menu,
  Button,
  Form,
  Input,
  Switch,
  Card,
  Typography,
  Divider,
  Timeline,
  Row,
  Col,
  Avatar,
  Space
} from 'antd';
import {
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

export default function App() {
  const [blessings, setBlessings] = useState([]);
  const [form] = Form.useForm();
  const [hideNames, setHideNames] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedBlessings = localStorage.getItem('weddingBlessings');
    if (storedBlessings) {
      setBlessings(JSON.parse(storedBlessings));
    }
  }, []);

  const saveBlessings = (newBlessings) => {
    localStorage.setItem('weddingBlessings', JSON.stringify(newBlessings));
    setBlessings(newBlessings);
  };

  const handleSubmit = (values) => {
    // Process the name (mask it if hideNames is true)
    const processedName = hideNames ? maskName(values.name.trim()) : values.name.trim();

    const newBlessing = {
      id: Date.now(),
      name: processedName, // Store the already masked name
      message: values.message.trim(),
      date: new Date().toISOString()
    };

    const updatedBlessings = [...blessings, newBlessing];
    saveBlessings(updatedBlessings);
    form.resetFields();
  };

  const maskName = (name) => {
    if (!hideNames) return name;
    const firstChar = name.charAt(0);
    return firstChar + 'x'.repeat(name.length - 1);
  };

  return (
    <Layout className="min-h-screen">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Content>
        <Hero />
        <Agenda />
        <BlessingForm
          form={form}
          hideNames={hideNames}
          setHideNames={setHideNames}
          handleSubmit={handleSubmit}
          blessings={blessings}
          maskName={maskName}
        />
      </Content>
      <FooterSection />
    </Layout>
  );
}

function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { key: 'home', label: 'Home', href: '#home' },
    { key: 'agenda', label: 'Agenda', href: '#agenda' },
    { key: 'blessings', label: 'Blessings', href: '#blessings' },
    { key: 'contact', label: 'Contact', href: '#contact' }
  ];

  return (
    <Header id="home" style={{ background: 'white', padding: '0 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
      <Row justify="space-between" align="middle">
        <Col>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <HeartOutlined style={{ fontSize: '24px', color: '#f06292', marginRight: '10px' }} />
            <Title level={4} style={{ margin: 0, color: '#f06292' }}>Forever & Always</Title>
          </div>
        </Col>

        <Col className="hidden md:block">
          <Menu mode="horizontal" selectedKeys={[]} style={{ border: 'none' }}>
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                <a href={item.href} style={{ color: '#555', fontWeight: 500 }}>{item.label}</a>
              </Menu.Item>
            ))}
          </Menu>
        </Col>

        <Col className="md:hidden">
          <Button
            type="text"
            icon={isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            onClick={toggleMenu}
            style={{ fontSize: '18px' }}
          />
        </Col>
      </Row>

      {isMenuOpen && (
        <div className="md:hidden" style={{ background: 'white', padding: '10px 0', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <Menu mode="vertical" selectable={false}>
            {menuItems.map(item => (
              <Menu.Item key={item.key}>
                <a
                  href={item.href}
                  onClick={toggleMenu}
                  style={{ display: 'block', padding: '10px 0' }}
                >
                  {item.label}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      )}
    </Header>
  );
}

function Hero() {
  return (
    <div style={{ background: 'linear-gradient(to bottom, #fce4ec, white)', padding: '80px 0' }}>
      <Row justify="center" align="middle">
        <Col xs={22} md={20} lg={18}>
          <div style={{ textAlign: 'center' }}>
            <Title style={{ color: '#d81b60', fontSize: '48px', marginBottom: '16px' }}>
              Bethe & Zank
            </Title>
            <Paragraph style={{ fontSize: '24px', color: '#555', marginBottom: '32px' }}>
              are getting married
            </Paragraph>

            <Card
              bordered={false}
              style={{
                display: 'inline-block',
                padding: '8px',
                borderRadius: '12px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                marginBottom: '48px'
              }}
            >
              <div style={{
                border: '4px solid #f8bbd0',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
                  June 15, 2025
                </Text>
              </div>
            </Card>

            <div>
              <img
                src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Wedding Couple"
                style={{
                  maxWidth: '100%',
                  borderRadius: '12px',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function Agenda() {
  const events = [
    { time: "2:00 PM", title: "Welcome Reception", description: "Guests arrive and enjoy welcome drinks" },
    { time: "3:00 PM", title: "Ceremony", description: "The beautiful exchange of vows" },
    { time: "4:00 PM", title: "Cocktail Hour", description: "Celebration with drinks and appetizers" },
    { time: "5:30 PM", title: "Dinner Service", description: "Elegant dinner with friends and family" },
    { time: "7:00 PM", title: "First Dance", description: "The couple's first dance as newlyweds" },
    { time: "7:30 PM", title: "Party Time", description: "Dancing and celebration until midnight" }
  ];

  return (
    <div id="agenda" style={{ padding: '80px 24px', background: 'white' }}>
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={2} style={{ color: '#d81b60' }}>Wedding Day Agenda</Title>
          </div>

          <Timeline mode="alternate" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {events.map((event, index) => (
              <Timeline.Item
                key={index}
                color="#ec407a"
                dot={index % 2 === 0 ? <HeartOutlined style={{ fontSize: '16px' }} /> : undefined}
              >
                <Card
                  bordered={false}
                  style={{
                    background: '#fce4ec',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  <Text type="secondary" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                    {event.time}
                  </Text>
                  <Title level={4} style={{ margin: '8px 0', color: '#333' }}>
                    {event.title}
                  </Title>
                  <Text style={{ color: '#555' }}>
                    {event.description}
                  </Text>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        </Col>
      </Row>
    </div>
  );
}

function BlessingForm({ form, hideNames, setHideNames, handleSubmit, blessings,  }) {
  return (
    <div id="blessings" style={{ padding: '80px 24px', background: '#fce4ec' }}>
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <Title level={2} style={{ color: '#d81b60' }}>Send Your Blessings</Title>
          </div>

          <Card
            bordered={false}
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              borderRadius: '12px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="name"
                label="Your Name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" size="large" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Your Blessing Message"
                rules={[{ required: true, message: 'Please enter your blessing message' }]}
              >
                <TextArea
                  placeholder="Write your blessing for the couple..."
                  autoSize={{ minRows: 4 }}
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Space align="center">
                  <Switch
                    checked={hideNames}
                    onChange={setHideNames}
                    checkedChildren="Hide Names"
                    unCheckedChildren="Show Names"
                  />
                  <Text type="secondary">
                    {hideNames ?
                      "Your name will be masked (e.g., John → Jxxx)" :
                      "Your full name will be visible"}
                  </Text>
                </Space>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{
                    background: '#ec407a',
                    borderColor: '#d81b60',
                    height: '50px',
                    fontSize: '16px'
                  }}
                >
                  Send Blessing
                </Button>
              </Form.Item>
            </Form>
          </Card>

          <Divider orientation="center" style={{ margin: '60px 0 40px' }}>
            <Title level={3} style={{ color: '#333', margin: 0 }}>
              Blessings from Loved Ones
            </Title>
          </Divider>

          {blessings.length === 0 ? (
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary" italic>Be the first to send your blessing!</Text>
            </div>
          ) : (
            <Row gutter={[24, 24]}>
              {blessings.map((blessing) => (
                <Col xs={24} md={12} key={blessing.id}>
                  <Card
                    bordered={false}
                    style={{
                      height: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Paragraph style={{ fontSize: '16px', color: '#555' }}>
                      {blessing.message}
                    </Paragraph>
                    <div style={{ textAlign: 'right' }}>
                      <Text type="secondary" strong>— {blessing.name}</Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

function FooterSection() {
  return (
    <Footer id="contact" style={{ background: '#ec407a', padding: '60px 24px' }}>
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={2} style={{ color: 'white', marginBottom: '8px' }}>Contact Us</Title>
            <Text style={{ color: '#fce4ec' }}>For any questions about our special day</Text>
          </div>

          <Row gutter={[48, 32]} justify="center">
            <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
              <Avatar
                size={64}
                icon={<PhoneOutlined />}
                style={{ background: '#fce4ec', color: '#ec407a', marginBottom: '16px' }}
              />
              <Title level={4} style={{ color: 'white' }}>Phone</Title>
              <Text style={{ color: '#fce4ec' }}>+1 (555) 123-4567</Text>
            </Col>

            <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
              <Avatar
                size={64}
                icon={<MailOutlined />}
                style={{ background: '#fce4ec', color: '#ec407a', marginBottom: '16px' }}
              />
              <Title level={4} style={{ color: 'white' }}>Email</Title>
              <Text style={{ color: '#fce4ec' }}>wedding@bethezank.com</Text>
            </Col>

            <Col xs={24} sm={8} style={{ textAlign: 'center' }}>
              <Avatar
                size={64}
                icon={<EnvironmentOutlined />}
                style={{ background: '#fce4ec', color: '#ec407a', marginBottom: '16px' }}
              />
              <Title level={4} style={{ color: 'white' }}>Venue</Title>
              <Text style={{ color: '#fce4ec' }}>123 Wedding Lane, Lovetown</Text>
            </Col>
          </Row>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <Space size="large" style={{ marginBottom: '24px' }}>
              <a href="#" style={{ color: 'white', fontSize: '24px' }}>
                <InstagramOutlined />
              </a>
            </Space>
            <div>
              <Text style={{ color: '#fce4ec' }}>
                &copy; {new Date().getFullYear()} Bethe & Zank | Made with <HeartOutlined />
              </Text>
            </div>
          </div>
        </Col>
      </Row>
    </Footer>
  );
}