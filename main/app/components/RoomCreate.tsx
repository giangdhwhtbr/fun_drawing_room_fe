"use client";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export default function RoomCreate() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<CreateRoomPayload>();
  const values = Form.useWatch([], form);
  const initialValues: CreateRoomPayload = {
    name: "",
    description: "",
  };

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setIsValid(true);
      },
      () => {
        setIsValid(false);
      }
    );
  }, [form, values]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`/api/rooms`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      const {success, message, data } =  await resp.json();
      if (success) {
        router.refresh()
        setIsModalOpen(false)
        form.resetFields()
        toast.success(`Room "${data.name}" is created successfully`)
      } else {
        throw new Error(message)
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        onClick={showModal}
        disabled={loading}
      >
        Create Room
      </Button>
      <Modal
        title="Create Room"
        open={isModalOpen}
        onOk={form.submit}
        okButtonProps={{
          disabled: loading || !isValid,
        }}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onFinish={handleSubmit}
        >
          <Form.Item
            layout="vertical"
            name="name"
            label="Name"
            rules={[{ required: true, message: "Room Name is required!" }]}
          >
            <Input name="name" />
          </Form.Item>
          <Form.Item layout="vertical" name="description" label="Description">
            <Input name="description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
