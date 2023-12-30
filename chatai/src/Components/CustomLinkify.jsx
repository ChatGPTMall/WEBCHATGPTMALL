import React from "react";
import Linkify from "react-linkify";
import { Image } from "antd";
export function CustomLinkify({ textWithImages }) {
    return (
        <div style={{ whiteSpace: "pre-line" }}>

            <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                    <div className="py-3"><Image height={200} src={decoratedHref} /></div>
                )}
            >
                <div>
                    {`${textWithImages}`}
                </div>
            </Linkify>
        </div>
    );
}
