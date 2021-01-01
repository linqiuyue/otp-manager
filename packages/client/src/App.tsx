import {
  Button,
  Input,
  Layout,
  PageHeader,
  Progress,
  Typography,
  Form,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useInterval, useToggle } from "react-use";
import { CreateItemModal } from "./components/CreateItemModal";
import { EditItemModal } from "./components/EditItemModal";
import { authenticator } from "otplib";
import { useItemLazyQuery } from "./generated/graphql";
import { useSearchParams } from "react-router-dom";

const { Search } = Input;

const { Content } = Layout;

const { Title } = Typography;

const Page = styled.div`
  width: 100%;
  height: 100%;
`;

const Main = styled(Content)`
  width: 60%;

  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 200px auto;
`;

const StyledButton = styled(Button)`
  margin-top: 60px;
`;

const StyledContent = styled.div`
  margin: 40px 0;
`;

function App() {
  const [form] = Form.useForm();

  const [createItemModalVisible, setCreateItemModalVisible] = useToggle(false);
  const [editItemModalVisible, setEditItemModalVisible] = useToggle(false);

  const [itemQuery, { data, loading }] = useItemLazyQuery();

  const [count, setCount] = useState(0);
  const [token, setToken] = useState("");

  const [searchParams, setSearchParams] = useSearchParams({ name: "" });
  const name = searchParams.get("name") || "";

  const generateToken = useCallback(
    () => setToken(data ? authenticator.generate(data?.item.secret) : ""),
    [data]
  );

  useEffect(() => {
    if (!data && name) {
      itemQuery({ variables: { name } });
    }

    generateToken();
  }, [data, generateToken, itemQuery, name]);

  useInterval(() => {
    const newCount = authenticator.timeUsed();

    if (count > newCount) {
      generateToken();
    }

    setCount(newCount);
  }, 500);

  //搜索事件
  const handleSearch = useCallback(
    (value: string) => {
      itemQuery({ variables: { name: value } });
      setSearchParams({ name: value });
    },
    [itemQuery, setSearchParams]
  );

  return (
    <Page>
      <PageHeader
        title=" "
        extra={[
          <Button
            key="add"
            onClick={() => {
              setCreateItemModalVisible();
            }}
          >
            + 添加
          </Button>,
        ]}
      />
      <Main>
        <Form form={form} initialValues={{ name: name }}>
          <Form.Item name="name">
            <Search
              enterButton="搜索"
              size="large"
              onSearch={(value) => handleSearch(value)}
              loading={loading}
            />
          </Form.Item>
        </Form>

        {token ? (
          <>
            <StyledContent>
              <Title copyable level={4}>
                {token}
              </Title>
            </StyledContent>

            <Progress
              width={40}
              type="circle"
              percent={(count / 30) * 100}
              format={() => 30 - count}
            />

            <StyledButton onClick={setEditItemModalVisible}>编辑</StyledButton>
          </>
        ) : null}
      </Main>

      <EditItemModal
        visible={editItemModalVisible}
        onOk={setEditItemModalVisible}
        onCancel={setEditItemModalVisible}
        data={data}
      />
      <CreateItemModal
        visible={createItemModalVisible}
        onCancel={setCreateItemModalVisible}
        onOk={(name) => {
          form.setFieldsValue({ name: name });
          handleSearch(name);
          setCreateItemModalVisible();
        }}
      />
    </Page>
  );
}

export default App;
