import React from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DropdownJsx = ({ selectable, items, className, onClick }) => {
  return (
    <Dropdown
      menu={{
        items,
        onClick,
      }}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space className={className}>
          {selectable}
          <CaretDownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownJsx;
